import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { DailyPlanService } from '../services/daily-plan.service';
import { CreateDailyPlanDto } from '../dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from '../dto/update-daily-plan.dto';

@Controller('daily-plan')
export class DailyPlanController {
  private readonly logger = new Logger(DailyPlanController.name);

  constructor(private readonly dailyPlanService: DailyPlanService) { }

  @Post()
  async create(@Body() createDailyPlanDto: CreateDailyPlanDto, userId: number) {
    this.logger.log('Creating daily plan');
    return await this.dailyPlanService.create(createDailyPlanDto, userId);
  }

  @Get()
  async findAll(@Body() userId: number) {
    this.logger.log('Getting all daily plans');
    return await this.dailyPlanService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Getting daily plan with id ${id}`);
    return await this.dailyPlanService.findOne(+id);
  }

  @Get('date/:date')
  async findByDate(@Param('date') date: string, @Body() userId: number) {
    this.logger.log(`Getting daily plan for date ${date}`);
    return await this.dailyPlanService.findByDate(new Date(date), userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDailyPlanDto: UpdateDailyPlanDto) {
    this.logger.log(`Updating daily plan with id ${id}`);
    return await this.dailyPlanService.update(+id, updateDailyPlanDto);
  }

  @Patch(':id/add-food')
  async addFoodToDailyPlan(@Param('id') id: string, @Body() dto: { foodId: number; quantity: number }) {
    this.logger.log(`Adding food to daily plan with id ${id}`);
    return await this.dailyPlanService.addFoodToDailyPlan(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log(`Deleting daily plan with id ${id}`);
    return await this.dailyPlanService.remove(+id);
  }
}
