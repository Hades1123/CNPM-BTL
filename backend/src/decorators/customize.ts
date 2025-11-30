import { UserRole } from '@/generated/prisma/enums';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLE = 'role';
export const Role = (role: UserRole) => SetMetadata(ROLE, role);
