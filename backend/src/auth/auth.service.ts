import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { ApiResponse } from '@/types/global';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findUser(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException('username or password is invalid !!!');
        }
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                username: user.username,
                name: user.name,
                role: user.role,
            },
        };
    }
    async signUp(registerDto: RegisterDto) {
        return this.usersService.createUser(registerDto);
    }
}
