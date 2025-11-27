import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from '@/types/global';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(username: string, pass: string): Promise<ApiResponse<{ access_token: string }>> {
        const user = await this.usersService.findUser(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException('username or password is invalid !!!');
        }
        const payload = { sub: user.id, username: user.username };
        return {
            success: true,
            message: 'Login successfully !!!',
            data: {
                access_token: await this.jwtService.signAsync(payload),
            },
        };
    }
}
