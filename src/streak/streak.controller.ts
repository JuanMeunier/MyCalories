import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StreakService } from './streak.service';
import { CreateStreakDto } from './dto/create-streak.dto';
import { UpdateStreakDto } from './dto/update-streak.dto';

@Controller('streak')
export class StreakController {
  constructor(private readonly streakService: StreakService) {}

  @Post()
  create(@Body() createStreakDto: CreateStreakDto) {
    return this.streakService.create(createStreakDto);
  }

  @Get()
  findAll() {
    return this.streakService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streakService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStreakDto: UpdateStreakDto) {
    return this.streakService.update(+id, updateStreakDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.streakService.remove(+id);
  }
}
