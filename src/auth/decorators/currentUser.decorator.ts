
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Interface para el payload del JWT
export interface JwtPayload {
    userId: number;
    email: string;
    iat?: number;
    exp?: number;
}

export const CurrentUser = createParamDecorator(
    (data: keyof JwtPayload | undefined, context: ExecutionContext): JwtPayload | any => {
        // Paso 1: Obtener el request del contexto HTTP
        const request = context.switchToHttp().getRequest();

        // Paso 2: Extraer el usuario del request (lo setea tu JwtAuthGuard)
        const user: JwtPayload = request.user;

        // Paso 3: Validar que el usuario exista
        if (!user) {
            return null;
        }

        // Paso 4: Retornar propiedad específica o usuario completo
        return data ? user[data] : user;
    },
);