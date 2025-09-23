import { Controller, Get, Param } from '@nestjs/common';
import { StreakService } from '../services/streak.service';

@Controller('streak')
export class StreakController {
  constructor(private readonly streakService: StreakService) { }
  // Obtener la racha actual de un usuario
  @Get(':userId')
  async getStreak(@Param('userId') userId: number) {
    const streak = await this.streakService.get(userId);
    if (!streak) return { message: 'No hay racha activa para este usuario' };
    return streak;
  }


}
