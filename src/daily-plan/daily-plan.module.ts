import { Module } from '@nestjs/common';
import { DailyPlanService } from './daily-plan.service';
import { DailyPlanController } from './controllers/daily-plan.controller';

@Module({
  controllers: [DailyPlanController],
  providers: [DailyPlanService],
})
export class DailyPlanModule { }
