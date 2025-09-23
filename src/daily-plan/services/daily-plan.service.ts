import { Injectable, Logger, OnModuleInit, NotFoundException } from '@nestjs/common';
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


  async findOne(id: number) {
    const plan = await this.dailyPlan.findUnique({
      where: { id },
      include: { foods: true },
    });
    if (!plan) throw new NotFoundException(`DailyPlan #${id} no encontrado`);
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
    if (!plan) throw new NotFoundException(`DailyPlan for date ${date.toDateString()} no encontrado`);
    return plan;
  }


  async update(id: number, updateDailyPlanDto: UpdateDailyPlanDto) {
    return this.dailyPlan.update({
      where: { id },
      data: { ...updateDailyPlanDto },
    });
  }


  async remove(id: number) {
    return this.dailyPlan.delete({ where: { id } });
  }


  async addFoodToDailyPlan(dailyPlanId: number, dto: AddFoodToDailyPlanDto) {
    const dailyPlan = await this.dailyPlan.findUnique({
      where: { id: dailyPlanId },
      include: { foods: true },
    });
    if (!dailyPlan) throw new NotFoundException('DailyPlan no encontrado');

    const food = await this.food.findUnique({ where: { id: dto.foodId } });
    if (!food) throw new NotFoundException('Food no encontrado');

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
