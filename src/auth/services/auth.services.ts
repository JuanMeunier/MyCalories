// src/auth/services/auth.services.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { AuthResponseDto } from "../dto/authResponse.dto";
import { RegisterUserDto } from "../dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/services/users.service";
import { User } from '@prisma/client'; // ← Usar tipo de Prisma
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<Omit<User, 'password'>> {
        const { name, email, password } = registerUserDto;
        const existingUser = await this.usersService.findByEmail(email);

        if (existingUser) {
            throw new UnauthorizedException('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
        });

        // Eliminar la contraseña del objeto de usuario antes de devolverlo
        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        const { email, password } = loginDto;
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { userId: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        // Eliminar la contraseña del objeto de usuario antes de devolverlo
        const { password: _, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }
}