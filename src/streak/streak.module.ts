import { Module } from '@nestjs/common';
import { StreakService } from './services/streak.service';
import { StreakController } from './controllers/streak.controller';

@Module({
  controllers: [StreakController],
  providers: [StreakService],
})
export class StreakModule { }
