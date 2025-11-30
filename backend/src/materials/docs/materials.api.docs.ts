import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateMaterialDto } from '@/materials/dto/create-material.dto';

export const CreateMaterialApiDoc = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Create material for session',
            description:
                'Add a new material (file) to a specific session. Only the tutor of the session can add materials.',
        }),
        ApiParam({
            name: 'sessionId',
            type: 'number',
            description: 'Session ID to add material to',
            example: 1,
        }),
        ApiBody({
            type: CreateMaterialDto,
            description: 'Material information',
        }),
        ApiResponse({
            status: 201,
            description: 'Material created successfully',
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
                        example: 'Material created successfully',
                        description: 'Response message',
                    },
                    data: {
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
                                description: 'Original filename',
                            },
                            fileUrl: {
                                type: 'string',
                                example: 'https://res.cloudinary.com/demo/raw/upload/v1234567890/slide_nestjs.pdf',
                                description: 'Cloudinary file URL',
                            },
                            createdAt: {
                                type: 'string',
                                example: '2025-11-27T12:00:00Z',
                                description: 'Creation timestamp',
                            },
                            sessionId: {
                                type: 'number',
                                example: 1,
                                description: 'Session ID',
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
                                        example: 'Lập trình NestJS',
                                        description: 'Session title',
                                    },
                                },
                                description: 'Session information',
                            },
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - Only tutor can add materials to their sessions',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Only tutor can add materials to their sessions',
                    },
                    statusCode: {
                        type: 'number',
                        example: 403,
                    },
                    timestamp: {
                        type: 'string',
                        example: '2025-11-27T12:00:00Z',
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
            status: 400,
            description: 'Bad Request - Validation failed',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Validation failed',
                    },
                    errors: {
                        type: 'array',
                        items: {
                            type: 'string',
                            example: 'Tên file không được để trống',
                        },
                    },
                    statusCode: {
                        type: 'number',
                        example: 400,
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

export const GetMaterialsBySessionApiDoc = () => {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            summary: 'Get session materials',
            description: 'Retrieve all materials for a specific session. Available to all authenticated users.',
        }),
        ApiParam({
            name: 'sessionId',
            type: 'number',
            description: 'Session ID to get materials for',
            example: 1,
        }),
        ApiResponse({
            status: 200,
            description: 'Materials retrieved successfully',
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
                        example: 'Materials retrieved successfully',
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
                                    description: 'Material ID',
                                },
                                fileName: {
                                    type: 'string',
                                    example: 'slide_nestjs.pdf',
                                    description: 'Original filename',
                                },
                                fileUrl: {
                                    type: 'string',
                                    example: 'https://res.cloudinary.com/demo/raw/upload/v1234567890/slide_nestjs.pdf',
                                    description: 'Cloudinary file URL',
                                },
                                createdAt: {
                                    type: 'string',
                                    example: '2025-11-27T12:00:00Z',
                                    description: 'Creation timestamp',
                                },
                                sessionId: {
                                    type: 'number',
                                    example: 1,
                                    description: 'Session ID',
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
                                            example: 'Lập trình NestJS',
                                            description: 'Session title',
                                        },
                                    },
                                    description: 'Session information',
                                },
                            },
                        },
                        description: 'List of materials',
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
            status: 500,
            description: 'Internal Server Error',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Internal server error',
                    },
                    statusCode: {
                        type: 'number',
                        example: 500,
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
