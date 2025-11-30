import { UserRole } from '@/generated/prisma/enums';

export interface Payload {
    username: string;
    name: string;
    role: UserRole;
}
