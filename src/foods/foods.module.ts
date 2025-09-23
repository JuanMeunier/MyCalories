import { Module } from '@nestjs/common';
import { FoodsService } from './services/foods.service';
import { FoodsController } from './controllers/foods.controller';

@Module({
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule { }
