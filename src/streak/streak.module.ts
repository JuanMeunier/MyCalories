import { Module } from '@nestjs/common';
import { StreakService } from './streak.service';
import { StreakController } from './streak.controller';

@Module({
  controllers: [StreakController],
  providers: [StreakService],
})
export class StreakModule {}
