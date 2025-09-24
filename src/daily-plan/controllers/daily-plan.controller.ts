// src/daily-plan/controllers/daily-plan.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards
} from '@nestjs/common';
import { DailyPlanService } from '../services/daily-plan.service';
import { CreateDailyPlanDto } from '../dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from '../dto/update-daily-plan.dto';
import { AddFoodToDailyPlanDto } from '../dto/add-food.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';

@ApiTags('Daily Plans')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('daily-plan')
export class DailyPlanController {
  private readonly logger = new Logger(DailyPlanController.name);

  constructor(private readonly dailyPlanService: DailyPlanService) { }

  @Post()
  @ApiOperation({
    summary: 'Crear plan diario',
    description: 'Crear un nuevo plan diario con límite de calorías'
  })
  @ApiBody({ type: CreateDailyPlanDto })
  @ApiResponse({ status: 201, description: 'Plan diario creado exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  async create(
    @Body() createDailyPlanDto: CreateDailyPlanDto,
    @CurrentUser('userId') userId: number
  ) {
    this.logger.log('Creating daily plan');
    return await this.dailyPlanService.create(createDailyPlanDto, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los planes diarios',
    description: 'Obtener todos los planes diarios del usuario autenticado'
  })
  @ApiResponse({ status: 200, description: 'Planes diarios obtenidos exitosamente' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  async findAll(@CurrentUser('userId') userId: number) {
    this.logger.log('Getting all daily plans');
    return await this.dailyPlanService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener plan diario por ID',
    description: 'Obtener un plan diario específico por su ID'
  })
  @ApiParam({ name: 'id', description: 'ID del plan diario' })
  @ApiResponse({ status: 200, description: 'Plan diario encontrado' })
  @ApiNotFoundResponse({ description: 'Plan diario no encontrado' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser('userId') userId: number
  ) {
    this.logger.log(`Getting daily plan with id ${id}`);
    return await this.dailyPlanService.findOne(+id, userId);
  }

  @Get('date/:date')
  @ApiOperation({
    summary: 'Obtener plan diario por fecha',
    description: 'Obtener plan diario por fecha específica (YYYY-MM-DD)'
  })
  @ApiParam({ name: 'date', description: 'Fecha en formato YYYY-MM-DD', example: '2024-09-23' })
  @ApiResponse({ status: 200, description: 'Plan diario encontrado' })
  @ApiNotFoundResponse({ description: 'Plan diario no encontrado para esta fecha' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  async findByDate(
    @Param('date') date: string,
    @CurrentUser('userId') userId: number
  ) {
    this.logger.log(`Getting daily plan for date ${date}`);
    return await this.dailyPlanService.findByDate(new Date(date), userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar plan diario',
    description: 'Actualizar un plan diario existente'
  })
  @ApiParam({ name: 'id', description: 'ID del plan diario' })
  @ApiBody({ type: UpdateDailyPlanDto })
  @ApiResponse({ status: 200, description: 'Plan diario actualizado exitosamente' })
  @ApiNotFoundResponse({ description: 'Plan diario no encontrado' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  async update(
    @Param('id') id: string,
    @Body() updateDailyPlanDto: UpdateDailyPlanDto,
    @CurrentUser('userId') userId: number
  ) {
    this.logger.log(`Updating daily plan with id ${id}`);
    return await this.dailyPlanService.update(+id, updateDailyPlanDto, userId);
  }

  @Patch(':id/add-food')
  @ApiOperation({
    summary: 'Agregar alimento al plan diario',
    description: 'Agregar un alimento con cantidad específica al plan diario'
  })
  @ApiParam({ name: 'id', description: 'ID del plan diario' })
  @ApiBody({
    type: AddFoodToDailyPlanDto,
    description: 'Alimento y cantidad a agregar'
  })
  @ApiResponse({ status: 200, description: 'Alimento agregado exitosamente al plan' })
  @ApiNotFoundResponse({ description: 'Plan diario o alimento no encontrado' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  async addFoodToDailyPlan(
    @Param('id') id: string,
    @Body() dto: AddFoodToDailyPlanDto,
    @CurrentUser('userId') userId: number
  ) {
    this.logger.log(`Adding food to daily plan with id ${id}`);
    return await this.dailyPlanService.addFoodToDailyPlan(+id, dto, userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar plan diario',
    description: 'Eliminar un plan diario específico'
  })
  @ApiParam({ name: 'id', description: 'ID del plan diario' })
  @ApiResponse({ status: 200, description: 'Plan diario eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Plan diario no encontrado' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  async remove(
    @Param('id') id: string,
    @CurrentUser('userId') userId: number
  ) {
    this.logger.log(`Deleting daily plan with id ${id}`);
    return await this.dailyPlanService.remove(+id, userId);
  }
}