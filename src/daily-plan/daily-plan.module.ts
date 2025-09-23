import { Module } from '@nestjs/common';
import { DailyPlanService } from './services/daily-plan.service';
import { DailyPlanController } from './controllers/daily-plan.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DailyPlanController],
  providers: [DailyPlanService],
})
export class DailyPlanModule { }
