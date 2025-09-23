import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class AuthResponseDto {
    @ApiProperty({
        example: {
            id: 1,
            name: "Juan Pérez",
            email: "juan@example.com"
        }
    })
    user: Omit<User, 'password'>; // ← Usar tipo de Prisma sin password

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    token: string;
}