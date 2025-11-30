import { IS_PUBLIC_KEY, ROLE } from '@/decorators/customize';
import { UserRole } from '@/generated/prisma/enums';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
    HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Payload } from './dto/payload.dto';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const role = this.reflector.getAllAndOverride<UserRole>(ROLE, [context.getHandler()]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync<Payload>(token, {
                secret: process.env.JWT_SECRET,
            });

            request['user'] = payload;

            if (role && !this.checkRole(payload.role, role)) {
                throw new ForbiddenException('Bạn không có quyền truy cập tài nguyên này');
            }
        } catch (err) {
            // If the error is an HttpException thrown intentionally (e.g., Forbidden), rethrow it
            if (err instanceof HttpException) {
                throw err;
            }
            // Otherwise it's an authentication/verification error
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private checkRole(userRole: UserRole, requiredRole: UserRole) {
        return userRole === requiredRole;
    }
}
