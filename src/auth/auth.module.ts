// src/auth/auth.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./services/auth.services";
import { AuthController } from "./controllers/auth.controllers";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { envs } from 'src/config';

@Module({
  imports: [
    PassportModule,
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: {
        expiresIn: envs.jwtExpiresIn,
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule, AuthService],
})
export class AuthModule { }