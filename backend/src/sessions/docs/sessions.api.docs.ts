import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

export const GetAllSessionsApiDoc = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Get all sessions',
            description: 'Retrieve all available sessions with user registration status and tutor information',
        }),
        ApiResponse({
            status: 200,
            description: 'Sessions retrieved successfully',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: true,
                        description: 'Request status',
                    },
                    message: {
                        type: 'string',
                        example: 'Sessions retrieved successfully',
                        description: 'Response message',
                    },
                    data: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    example: 1,
                                    description: 'Session ID',
                                },
                                title: {
                                    type: 'string',
                                    example: 'Lập trình NestJS từ A-Z',
                                    description: 'Session title',
                                },
                                description: {
                                    type: 'string',
                                    example: 'Khóa học lập trình NestJS cơ bản đến nâng cao',
                                    description: 'Session description',
                                },
                                startTime: {
                                    type: 'string',
                                    example: '2025-11-28T09:00:00Z',
                                    description: 'Session start time',
                                },
                                endTime: {
                                    type: 'string',
                                    example: '2025-11-28T11:00:00Z',
                                    description: 'Session end time',
                                },
                                location: {
                                    type: 'string',
                                    example: 'Room A101',
                                    description: 'Session location',
                                },
                                maxStudents: {
                                    type: 'number',
                                    example: 30,
                                    description: 'Maximum number of students',
                                },
                                createdAt: {
                                    type: 'string',
                                    example: '2025-11-27T10:00:00Z',
                                    description: 'Session creation time',
                                },
                                updatedAt: {
                                    type: 'string',
                                    example: '2025-11-27T10:00:00Z',
                                    description: 'Session last update time',
                                },
                                tutor: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'number',
                                            example: 5,
                                            description: 'Tutor ID',
                                        },
                                        username: {
                                            type: 'string',
                                            example: 'tutor_hung',
                                            description: 'Tutor username',
                                        },
                                        name: {
                                            type: 'string',
                                            example: 'Nguyễn Văn Hùng',
                                            description: 'Tutor full name',
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'hung@example.com',
                                            description: 'Tutor email',
                                        },
                                        role: {
                                            type: 'string',
                                            example: 'TUTOR',
                                            description: 'Tutor role',
                                        },
                                    },
                                    description: 'Session tutor information',
                                },
                                _count: {
                                    type: 'object',
                                    properties: {
                                        registrations: {
                                            type: 'number',
                                            example: 25,
                                            description: 'Number of registered students',
                                        },
                                    },
                                    description: 'Registration counts',
                                },
                                userRegistration: {
                                    oneOf: [
                                        {
                                            type: 'null',
                                            description: 'User has not registered for this session',
                                        },
                                        {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'number',
                                                    example: 123,
                                                    description: 'Registration ID',
                                                },
                                                sessionId: {
                                                    type: 'number',
                                                    example: 1,
                                                    description: 'Session ID',
                                                },
                                                registeredAt: {
                                                    type: 'string',
                                                    example: '2025-11-27T12:00:00Z',
                                                    description: 'Registration time',
                                                },
                                                status: {
                                                    type: 'string',
                                                    example: 'REGISTERED',
                                                    description: 'Registration status',
                                                },
                                            },
                                            description: 'User registration information',
                                        },
                                    ],
                                    description: 'Current user registration status',
                                },
                            },
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized - Missing or invalid token',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Unauthorized',
                    },
                    statusCode: {
                        type: 'number',
                        example: 401,
                    },
                    timestamp: {
                        type: 'string',
                        example: '2025-11-27T12:00:00Z',
                    },
                },
            },
        }),
    );
};

export const RegisterSessionApiDoc = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Register for session',
            description: 'Register the authenticated user for a specific session if slots are available',
        }),
        ApiParam({
            name: 'id',
            type: 'number',
            description: 'Session ID to register for',
            example: 1,
        }),
        ApiResponse({
            status: 200,
            description: 'Registration successful',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: true,
                        description: 'Request status',
                    },
                    message: {
                        type: 'string',
                        example: 'Successfully registered for session',
                        description: 'Response message',
                    },
                    data: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                example: 123,
                                description: 'Registration ID',
                            },
                            status: {
                                type: 'string',
                                example: 'REGISTERED',
                                description: 'Registration status',
                            },
                            registeredAt: {
                                type: 'string',
                                example: '2025-11-27T12:00:00Z',
                                description: 'Registration time',
                            },
                            student: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        example: 10,
                                        description: 'Student ID',
                                    },
                                    username: {
                                        type: 'string',
                                        example: 'student1',
                                        description: 'Student username',
                                    },
                                    name: {
                                        type: 'string',
                                        example: 'Nguyễn Văn A',
                                        description: 'Student full name',
                                    },
                                    email: {
                                        type: 'string',
                                        example: 'student1@example.com',
                                        description: 'Student email',
                                    },
                                },
                                description: 'Student information',
                            },
                            session: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        example: 1,
                                        description: 'Session ID',
                                    },
                                    title: {
                                        type: 'string',
                                        example: 'Lập trình NestJS từ A-Z',
                                        description: 'Session title',
                                    },
                                    startTime: {
                                        type: 'string',
                                        example: '2025-11-28T09:00:00Z',
                                        description: 'Session start time',
                                    },
                                    endTime: {
                                        type: 'string',
                                        example: '2025-11-28T11:00:00Z',
                                        description: 'Session end time',
                                    },
                                },
                                description: 'Session information',
                            },
                        },
                        description: 'Registration details',
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Session not found',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Session not found',
                    },
                    statusCode: {
                        type: 'number',
                        example: 404,
                    },
                    timestamp: {
                        type: 'string',
                        example: '2025-11-27T12:00:00Z',
                    },
                },
            },
        }),
        ApiResponse({
            status: 409,
            description: 'Conflict - Already registered or session full',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Already registered for this session',
                    },
                    statusCode: {
                        type: 'number',
                        example: 409,
                    },
                    timestamp: {
                        type: 'string',
                        example: '2025-11-27T12:00:00Z',
                    },
                },
            },
        }),
    );
};

export const CancelRegistrationApiDoc = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Cancel session registration',
            description: 'Cancel registration for a specific session (only before session starts)',
        }),
        ApiParam({
            name: 'id',
            type: 'number',
            description: 'Session ID to cancel registration for',
            example: 1,
        }),
        ApiResponse({
            status: 200,
            description: 'Registration cancelled successfully',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: true,
                        description: 'Request status',
                    },
                    message: {
                        type: 'string',
                        example: 'Registration cancelled successfully',
                        description: 'Response message',
                    },
                    data: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                example: 123,
                                description: 'Registration ID',
                            },
                            status: {
                                type: 'string',
                                example: 'CANCELLED',
                                description: 'Updated registration status',
                            },
                            registeredAt: {
                                type: 'string',
                                example: '2025-11-27T12:00:00Z',
                                description: 'Original registration time',
                            },
                            student: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        example: 10,
                                        description: 'Student ID',
                                    },
                                    username: {
                                        type: 'string',
                                        example: 'student1',
                                        description: 'Student username',
                                    },
                                    name: {
                                        type: 'string',
                                        example: 'Nguyễn Văn A',
                                        description: 'Student full name',
                                    },
                                    email: {
                                        type: 'string',
                                        example: 'student1@example.com',
                                        description: 'Student email',
                                    },
                                },
                                description: 'Student information',
                            },
                            session: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        example: 1,
                                        description: 'Session ID',
                                    },
                                    title: {
                                        type: 'string',
                                        example: 'Lập trình NestJS từ A-Z',
                                        description: 'Session title',
                                    },
                                    startTime: {
                                        type: 'string',
                                        example: '2025-11-28T09:00:00Z',
                                        description: 'Session start time',
                                    },
                                    endTime: {
                                        type: 'string',
                                        example: '2025-11-28T11:00:00Z',
                                        description: 'Session end time',
                                    },
                                },
                                description: 'Session information',
                            },
                        },
                        description: 'Updated registration details',
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Session or registration not found',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Registration not found',
                    },
                    statusCode: {
                        type: 'number',
                        example: 404,
                    },
                    timestamp: {
                        type: 'string',
                        example: '2025-11-27T12:00:00Z',
                    },
                },
            },
        }),
        ApiResponse({
            status: 409,
            description: 'Conflict - Cannot cancel past session or already cancelled',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Cannot cancel registration for past sessions',
                    },
                    statusCode: {
                        type: 'number',
                        example: 409,
                    },
                    timestamp: {
                        type: 'string',
                        example: '2025-11-27T12:00:00Z',
                    },
                },
            },
        }),
    );
};

export const GetMyRegistrationsApiDoc = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Get my registrations',
            description: 'Retrieve all sessions that the authenticated user has registered for',
        }),
        ApiResponse({
            status: 200,
            description: 'Registrations retrieved successfully',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: true,
                        description: 'Request status',
                    },
                    message: {
                        type: 'string',
                        example: 'Student registrations retrieved successfully',
                        description: 'Response message',
                    },
                    data: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                registration: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'number',
                                            example: 123,
                                            description: 'Registration ID',
                                        },
                                        status: {
                                            type: 'string',
                                            example: 'REGISTERED',
                                            description: 'Registration status',
                                        },
                                        registeredAt: {
                                            type: 'string',
                                            example: '2025-11-27T12:00:00Z',
                                            description: 'Registration time',
                                        },
                                    },
                                    description: 'Registration information',
                                },
                                session: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'number',
                                            example: 1,
                                            description: 'Session ID',
                                        },
                                        title: {
                                            type: 'string',
                                            example: 'Lập trình NestJS từ A-Z',
                                            description: 'Session title',
                                        },
                                        description: {
                                            type: 'string',
                                            example: 'Khóa học lập trình NestJS cơ bản đến nâng cao',
                                            description: 'Session description',
                                        },
                                        startTime: {
                                            type: 'string',
                                            example: '2025-11-28T09:00:00Z',
                                            description: 'Session start time',
                                        },
                                        endTime: {
                                            type: 'string',
                                            example: '2025-11-28T11:00:00Z',
                                            description: 'Session end time',
                                        },
                                        location: {
                                            type: 'string',
                                            example: 'Room A101',
                                            description: 'Session location',
                                        },
                                        maxStudents: {
                                            type: 'number',
                                            example: 30,
                                            description: 'Maximum number of students',
                                        },
                                        createdAt: {
                                            type: 'string',
                                            example: '2025-11-27T10:00:00Z',
                                            description: 'Session creation time',
                                        },
                                        updatedAt: {
                                            type: 'string',
                                            example: '2025-11-27T10:00:00Z',
                                            description: 'Session last update time',
                                        },
                                        currentStudents: {
                                            type: 'number',
                                            example: 25,
                                            description: 'Current number of registered students',
                                        },
                                        availableSlots: {
                                            type: 'number',
                                            example: 5,
                                            description: 'Available slots remaining',
                                        },
                                        tutor: {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'number',
                                                    example: 5,
                                                    description: 'Tutor ID',
                                                },
                                                username: {
                                                    type: 'string',
                                                    example: 'tutor_hung',
                                                    description: 'Tutor username',
                                                },
                                                name: {
                                                    type: 'string',
                                                    example: 'Nguyễn Văn Hùng',
                                                    description: 'Tutor full name',
                                                },
                                                email: {
                                                    type: 'string',
                                                    example: 'hung@example.com',
                                                    description: 'Tutor email',
                                                },
                                            },
                                            description: 'Session tutor information',
                                        },
                                        materials: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'number',
                                                        example: 1,
                                                        description: 'Material ID',
                                                    },
                                                    fileName: {
                                                        type: 'string',
                                                        example: 'slide_nestjs.pdf',
                                                        description: 'Material file name',
                                                    },
                                                    fileUrl: {
                                                        type: 'string',
                                                        example: 'https://example.com/files/slide_nestjs.pdf',
                                                        description: 'Material file URL',
                                                    },
                                                    createdAt: {
                                                        type: 'string',
                                                        example: '2025-11-27T10:00:00Z',
                                                        description: 'Material upload time',
                                                    },
                                                },
                                            },
                                            description: 'Session materials',
                                        },
                                    },
                                    description: 'Session information',
                                },
                            },
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized - Missing or invalid token',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Unauthorized',
                    },
                    statusCode: {
                        type: 'number',
                        example: 401,
                    },
                    timestamp: {
                        type: 'string',
                        example: '2025-11-27T12:00:00Z',
                    },
                },
            },
        }),
    );
};