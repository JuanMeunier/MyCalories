// src/auth/controllers/auth.controllers.ts
import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "../services/auth.services";
import { LoginDto } from "../dto/login.dto";
import { RegisterUserDto } from "../dto/register.dto";
import { AuthResponseDto } from "../dto/authResponse.dto";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({
        summary: 'Registrar nuevo usuario',
        description: 'Crear una nueva cuenta de usuario con email y contraseña'
    })
    @ApiBody({ type: RegisterUserDto })
    @ApiResponse({
        status: 201,
        description: 'Usuario registrado exitosamente',
        type: 'User without password'
    })
    @ApiBadRequestResponse({
        description: 'Datos de entrada inválidos'
    })
    @ApiUnauthorizedResponse({
        description: 'El usuario ya existe con ese email'
    })
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @Post('login')
    @ApiOperation({
        summary: 'Iniciar sesión',
        description: 'Autenticar usuario y obtener token JWT'
    })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: 'Login exitoso',
        type: AuthResponseDto
    })
    @ApiBadRequestResponse({
        description: 'Credenciales inválidas'
    })
    @ApiUnauthorizedResponse({
        description: 'Email o contraseña incorrectos'
    })
    async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
        return this.authService.login(loginDto);
    }
}