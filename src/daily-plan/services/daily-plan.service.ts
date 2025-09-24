// src/daily-plan/services/daily-plan.service.ts
import { Injectable, Logger, OnModuleInit, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateDailyPlanDto, UpdateDailyPlanDto, AddFoodToDailyPlanDto } from '../dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DailyPlanService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(DailyPlanService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma connected');
  }

  async create(createDailyPlanDto: CreateDailyPlanDto, userId: number) {
    return this.dailyPlan.create({
      data: {
        date: new Date(createDailyPlanDto.date),
        caloriesMax: createDailyPlanDto.caloriesMax,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.dailyPlan.findMany({
      where: { userId },
      include: { foods: true },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const plan = await this.dailyPlan.findUnique({
      where: { id },
      include: { foods: true },
    });

    if (!plan) {
      throw new NotFoundException(`DailyPlan #${id} no encontrado`);
    }

    // Verificar que el plan pertenezca al usuario
    if (plan.userId !== userId) {
      throw new ForbiddenException('No tienes acceso a este plan diario');
    }

    return plan;
  }

  async findByDate(date: Date, userId: number) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const plan = await this.dailyPlan.findFirst({
      where: {
        date: { gte: startOfDay, lte: endOfDay },
        userId,
      },
      include: { foods: true },
    });

    if (!plan) {
      throw new NotFoundException(`DailyPlan para la fecha ${date.toDateString()} no encontrado`);
    }

    return plan;
  }

  async update(id: number, updateDailyPlanDto: UpdateDailyPlanDto, userId: number) {
    // Verificar que el plan existe y pertenece al usuario
    await this.findOne(id, userId);

    return this.dailyPlan.update({
      where: { id },
      data: { ...updateDailyPlanDto },
    });
  }

  async remove(id: number, userId: number) {
    // Verificar que el plan existe y pertenece al usuario
    await this.findOne(id, userId);

    return this.dailyPlan.delete({ where: { id } });
  }

  async addFoodToDailyPlan(dailyPlanId: number, dto: AddFoodToDailyPlanDto, userId: number) {
    // Verificar que el plan existe y pertenece al usuario
    const dailyPlan = await this.findOne(dailyPlanId, userId);

    const food = await this.food.findUnique({ where: { id: dto.foodId } });
    if (!food) {
      throw new NotFoundException('Alimento no encontrado');
    }

    return this.dailyPlan.update({
      where: { id: dailyPlanId },
      data: {
        foods: { connect: { id: food.id } },
        totalCalories: dailyPlan.totalCalories + food.calories * dto.quantity,
        totalProteins: dailyPlan.totalProteins + food.proteins * dto.quantity,
        totalCarbs: dailyPlan.totalCarbs + food.carbs * dto.quantity,
        totalFats: dailyPlan.totalFats + food.fats * dto.quantity,
      },
      include: { foods: true },
    });
  }
}