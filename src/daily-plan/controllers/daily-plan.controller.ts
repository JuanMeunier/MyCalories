import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DailyPlanService } from './daily-plan.service';
import { CreateDailyPlanDto } from '../dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from '../dto/update-daily-plan.dto';

@Controller('daily-plan')
export class DailyPlanController {
  constructor(private readonly dailyPlanService: DailyPlanService) { }

  @Post()
  create(@Body() createDailyPlanDto: CreateDailyPlanDto) {
    return this.dailyPlanService.create(createDailyPlanDto);
  }

  @Get()
  findAll() {
    return this.dailyPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailyPlanDto: UpdateDailyPlanDto) {
    return this.dailyPlanService.update(+id, updateDailyPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyPlanService.remove(+id);
  }
}
