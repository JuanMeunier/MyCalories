import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StreakService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(StreakService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma connected in StreakService');
  }

  async createIfNotExists(userId: number) {
    const existing = await this.streak.findUnique({ where: { userId } });
    if (existing) return existing;

    return this.streak.create({
      data: { userId, lastDay: new Date(0) },
    });
  }
  // Obtener la racha actual (única)
  async findOne() {
    return this.streak.findFirst();
  }

  // Actualizar la racha basado en DailyPlan (evento 24h)
  async updateAfter24Hours(dailyPlan: any) {
    const streak = await this.streak.findFirst();
    if (!streak) return null;

    const isWithinCalories =
      Math.abs(dailyPlan.totalCalories - dailyPlan.caloriesMax) <= 100;

    if (isWithinCalories) {
      this.logger.log(
        `Racha incrementada. Total antes: ${streak.count}, DailyPlanId: ${dailyPlan.id}`,
      );
      return this.streak.update({
        where: { id: streak.id },
        data: { count: streak.count + 1 },
      });
    }

    return streak;
  }

  // Eliminar racha
  async remove() {
    const streak = await this.streak.findFirst();
    if (!streak) return null;
    return this.streak.delete({ where: { id: streak.id } });
  }

  async get(userId: number) {
    return this.streak.findUnique({ where: { userId } });
  }
}
