import { Injectable, OnModuleInit, ConflictException, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  async onModuleInit() {
    await this.$connect();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verifica si ya existe un usuario con el mismo email
    const existingUser = await this.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('El usuario ya existe con ese email');
    }
    try {
      return await this.user.create({
        data: createUserDto,
      });
    } catch (error) {
      this.logger.error('Error creando usuario', error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<User> {
    return this.user.delete({
      where: { id },
    });
  }
}
