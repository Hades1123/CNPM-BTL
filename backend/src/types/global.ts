import { UserRole } from '@/generated/prisma/enums';

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export class UserRequest {
    user: {
        sub: string;
        username: string;
        role: UserRole;
    };
}
