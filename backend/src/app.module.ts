import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PrismaService } from '@/database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './users/user.controller';
import { UsersService } from './users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '10d' },
        }),
    ],
    controllers: [AppController, UserController, AuthController],
    providers: [
        AppService,
        PrismaService,
        UsersService,
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
