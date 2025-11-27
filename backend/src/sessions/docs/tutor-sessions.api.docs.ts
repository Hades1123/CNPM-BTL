import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

export const GetTutorSessionsApiDoc = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Get tutor sessions',
            description: 'Retrieve all sessions created by the authenticated tutor with materials and registration counts',
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
                        example: 'Tutor sessions retrieved successfully',
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
                                isFull: {
                                    type: 'boolean',
                                    example: false,
                                    description: 'Whether session is full',
                                },
                                isOngoing: {
                                    type: 'boolean',
                                    example: false,
                                    description: 'Whether session is currently ongoing',
                                },
                                isPast: {
                                    type: 'boolean',
                                    example: false,
                                    description: 'Whether session has ended',
                                },
                                materials: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: {
                                                type: 'number',
                                                example: 1,
                                            },
                                            fileName: {
                                                type: 'string',
                                                example: 'slide_nestjs.pdf',
                                            },
                                            fileUrl: {
                                                type: 'string',
                                                example: 'https://example.com/files/slide_nestjs.pdf',
                                            },
                                            createdAt: {
                                                type: 'string',
                                                example: '2025-11-27T10:00:00Z',
                                            },
                                        },
                                    },
                                    description: 'Session materials',
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

export const GetTutorSessionDetailsApiDoc = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Get session details',
            description: 'Retrieve detailed information about a specific session including registered students list',
        }),
        ApiParam({
            name: 'id',
            type: 'number',
            description: 'Session ID',
            example: 1,
        }),
        ApiResponse({
            status: 200,
            description: 'Session details retrieved successfully',
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
                        example: 'Session details retrieved successfully',
                        description: 'Response message',
                    },
                    data: {
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
                            isFull: {
                                type: 'boolean',
                                example: false,
                                description: 'Whether session is full',
                            },
                            isOngoing: {
                                type: 'boolean',
                                example: false,
                                description: 'Whether session is currently ongoing',
                            },
                            isPast: {
                                type: 'boolean',
                                example: false,
                                description: 'Whether session has ended',
                            },
                            materials: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'number',
                                            example: 1,
                                        },
                                        fileName: {
                                            type: 'string',
                                            example: 'slide_nestjs.pdf',
                                        },
                                        fileUrl: {
                                            type: 'string',
                                            example: 'https://example.com/files/slide_nestjs.pdf',
                                        },
                                        createdAt: {
                                            type: 'string',
                                            example: '2025-11-27T10:00:00Z',
                                        },
                                    },
                                },
                                description: 'Session materials',
                            },
                            registeredStudents: {
                                type: 'array',
                                items: {
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
                                        faculty: {
                                            type: 'string',
                                            example: 'CNTT',
                                            description: 'Student faculty',
                                        },
                                    },
                                },
                                description: 'List of registered students',
                            },
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Session not found or access denied',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Session not found or access denied',
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