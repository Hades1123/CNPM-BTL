import { UserRequest } from '@/types/global';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ISessionRequest extends UserRequest {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    startTime: Date;

    @IsDate()
    endTime: Date;

    @IsString()
    location: string;

    @IsNumber()
    maxStudents: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    upDatedAt: Date;

    @IsNumber()
    tutorId: number;
}
