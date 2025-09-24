// src/foods/controllers/foods.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException
} from '@nestjs/common';
import { FoodsService } from '../services/foods.service';
import { CreateFoodDto } from '../dto/create-food.dto';
import { UpdateFoodDto } from '../dto/update-food.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
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

@ApiTags('Foods')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) { }

  @Post()
  @ApiOperation({
    summary: 'Crear alimento',
    description: 'Crear un nuevo alimento personalizado con información nutricional'
  })
  @ApiBody({ type: CreateFoodDto })
  @ApiResponse({ status: 201, description: 'Alimento creado exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los alimentos',
    description: 'Obtener lista completa de alimentos disponibles'
  })
  @ApiResponse({ status: 200, description: 'Alimentos obtenidos exitosamente' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  findAll() {
    return this.foodsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener alimento por ID',
    description: 'Obtener información detallada de un alimento específico'
  })
  @ApiParam({ name: 'id', description: 'ID del alimento' })
  @ApiResponse({ status: 200, description: 'Alimento encontrado' })
  @ApiNotFoundResponse({ description: 'Alimento no encontrado' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar alimento',
    description: 'Actualizar información nutricional de un alimento existente'
  })
  @ApiParam({ name: 'id', description: 'ID del alimento' })
  @ApiBody({ type: UpdateFoodDto })
  @ApiResponse({ status: 200, description: 'Alimento actualizado exitosamente' })
  @ApiNotFoundResponse({ description: 'Alimento no encontrado' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar alimento',
    description: 'Eliminar un alimento del sistema'
  })
  @ApiParam({ name: 'id', description: 'ID del alimento' })
  @ApiResponse({ status: 200, description: 'Alimento eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Alimento no encontrado' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requerido' })
  remove(@Param('id') id: string) {
    return this.foodsService.remove(+id);
  }

  // -----------------------
  // MARKET
  // -----------------------

  @Get('market')
  @ApiOperation({
    summary: 'Obtener todos los alimentos del Market',
    description: 'Devuelve todas las comidas públicas disponibles en el Market'
  })
  findAllMarket() {
    return this.foodsService.findAllMarket();
  }

  @Get('market/search/:name')
  @ApiOperation({
    summary: 'Buscar alimentos en el Market por nombre',
    description: 'Busca comidas públicas en el Market que contengan el nombre indicado'
  })
  findByNameMarket(@Param('name') name: string) {
    return this.foodsService.findByNameMarket(name);
  }

  @Post('market/clone/:name')
  @ApiOperation({
    summary: 'Clonar alimento del Market a tu inventario',
    description: 'Clona un alimento público del Market y lo añade a tu inventario privado'
  })
  addToMyFoods(@Param('name') name: string, @Param('userId') userId: number) {
    return this.foodsService.addToMyFoods(name, userId);
  }
}