import { Injectable } from '@nestjs/common';
import { CreateStreakDto } from './dto/create-streak.dto';
import { UpdateStreakDto } from './dto/update-streak.dto';

@Injectable()
export class StreakService {
  create(createStreakDto: CreateStreakDto) {
    return 'This action adds a new streak';
  }

  findAll() {
    return `This action returns all streak`;
  }

  findOne(id: number) {
    return `This action returns a #${id} streak`;
  }

  update(id: number, updateStreakDto: UpdateStreakDto) {
    return `This action updates a #${id} streak`;
  }

  remove(id: number) {
    return `This action removes a #${id} streak`;
  }
}
