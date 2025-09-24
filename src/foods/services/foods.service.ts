import { Injectable, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient, Food } from '@prisma/client';
import { CreateFoodDto } from '../dto/create-food.dto';
import { UpdateFoodDto } from '../dto/update-food.dto';

@Injectable()
export class FoodsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(FoodsService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma connected');
  }

  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    try {
      const food = await this.food.create({
        data: createFoodDto,
      });
      this.logger.log(`Food created with id ${food.id}`);
      return food;
    } catch (error) {
      this.logger.error('Error creating food', error);
      throw error;
    }
  }

  async findAll(): Promise<Food[]> {
    const foods = await this.food.findMany();
    this.logger.log(`Retrieved ${foods.length} foods`);
    return foods;
  }

  async findOne(id: number): Promise<Food> {
    const food = await this.food.findUnique({ where: { id } });
    if (!food) {
      this.logger.error(`Food with id ${id} not found`);
      throw new NotFoundException(`Food with id ${id} not found`);
    }
    this.logger.log(`Found food with id ${id}`);
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto): Promise<Food> {
    const food = await this.food.findUnique({ where: { id } });
    if (!food) {
      this.logger.error(`Food with id ${id} not found`);
      throw new NotFoundException(`Food with id ${id} not found`);
    }
    try {
      const updated = await this.food.update({
        where: { id },
        data: updateFoodDto,
      });
      this.logger.log(`Food with id ${id} updated`);
      return updated;
    } catch (error) {
      this.logger.error(`Error updating food with id ${id}`, error);
      throw error;
    }
  }

  async remove(id: number): Promise<Food> {
    const food = await this.food.findUnique({ where: { id } });
    if (!food) {
      this.logger.error(`Food with id ${id} not found`);
      throw new NotFoundException(`Food with id ${id} not found`);
    }
    try {
      const deleted = await this.food.delete({
        where: { id },
      });
      this.logger.log(`Food with id ${id} deleted`);
      return deleted;
    } catch (error) {
      this.logger.error(`Error deleting food with id ${id}`, error);
      throw error;
    }
  }

  // -----------------------------
  // 🚀 MARKET
  // -----------------------------

  async findAllMarket(): Promise<Food[]> {
    return this.food.findMany({
      where: { isPublic: true },
    });
  }

  async findByNameMarket(name: string): Promise<Food[]> {
    return this.food.findMany({
      where: {
        isPublic: true,
        name: { contains: name, mode: 'insensitive' },
      },
    });
  }

  async addToMyFoods(name: string, userId: number): Promise<Food> {
    // Buscar en el market por nombre (puede haber varias coincidencias)
    const sourceFood = await this.food.findFirst({
      where: { name, isPublic: true },
    });

    if (!sourceFood) {
      this.logger.error(`Food with name "${name}" not found in market`);
      throw new NotFoundException(`Food with name "${name}" not found in market`);
    }

    // Crear un clon en el inventario del usuario
    const clonedFood = await this.food.create({
      data: {
        name: sourceFood.name,
        calories: sourceFood.calories,
        proteins: sourceFood.proteins,
        carbs: sourceFood.carbs,
        fats: sourceFood.fats,
        createdBy: userId,
        isPublic: false,
      },
    });

    this.logger.log(`User ${userId} cloned "${name}" -> new food ${clonedFood.id}`);
    return clonedFood;
  }
}
