import { HttpException, HttpStatus } from '@nestjs/common';

export class SessionNotFoundException extends HttpException {
    constructor() {
        super('Session not found', HttpStatus.NOT_FOUND);
    }
}

export class AlreadyRegisteredException extends HttpException {
    constructor() {
        super('Already registered for this session', HttpStatus.CONFLICT);
    }
}

export class SessionFullException extends HttpException {
    constructor() {
        super('Session is full', HttpStatus.CONFLICT);
    }
}

export class SessionExpiredException extends HttpException {
    constructor() {
        super('Cannot register for past sessions', HttpStatus.CONFLICT);
    }
}

export class RegistrationNotFoundException extends HttpException {
    constructor() {
        super('Registration not found', HttpStatus.NOT_FOUND);
    }
}

export class CannotCancelPastSessionException extends HttpException {
    constructor() {
        super('Cannot cancel registration for past sessions', HttpStatus.CONFLICT);
    }
}

export class ScheduleConflictException extends HttpException {
    constructor(conflictingSession?: string) {
        super(
            conflictingSession
                ? `Lịch học bị trùng với buổi "${conflictingSession}"`
                : 'Lịch học bị trùng với một buổi học khác bạn đã đăng ký',
            HttpStatus.CONFLICT,
        );
    }
}
