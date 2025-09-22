import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FoodsModule } from './foods/foods.module';
import { DailyPlanModule } from './daily-plan/daily-plan.module';
import { StreakModule } from './streak/streak.module';

@Module({
  imports: [AuthModule, UsersModule, FoodsModule, DailyPlanModule, StreakModule],
})
export class AppModule { }
