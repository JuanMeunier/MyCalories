import { Module } from '@nestjs/common';
import { FoodsService } from './services/foods.service';
import { FoodsController } from './controllers/foods.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule { }
