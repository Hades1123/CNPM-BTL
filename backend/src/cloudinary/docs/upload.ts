import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const UploadSingleDocument = () => {
    return applyDecorators(
        ApiOperation({
            summary: 'Upload single file',
            description: 'Upload a single file (images: jpg, jpeg, png, gif or documents: pdf, docx, doc) to Cloudinary storage',
        }),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    file: {
                        type: 'string',
                        format: 'binary',
                        description: 'File to upload (Supported formats: Images: jpg, jpeg, png, gif; Documents: pdf, docx, doc)',
                    },
                },
                required: ['file'],
            },
        }),
        ApiResponse({
            status: 201,
            description: 'File uploaded successfully',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: true,
                        description: 'Upload status',
                    },
                    message: {
                        type: 'string',
                        example: 'File uploaded successfully',
                        description: 'Response message',
                    },
                    data: {
                        type: 'object',
                        properties: {
                            url: {
                                type: 'string',
                                oneOf: [
                                    {
                                        example: 'https://res.cloudinary.com/demo/raw/upload/v1234567890/document.pdf',
                                        description: 'Document URL (PDF, DOCX, etc.)',
                                    },
                                    {
                                        example: 'https://res.cloudinary.com/demo/image/upload/v1234567890/image.jpg',
                                        description: 'Image URL (JPG, PNG, etc.)',
                                    }
                                ],
                            },
                            publicId: {
                                type: 'string',
                                example: 'file_v1234567890',
                                description: 'Cloudinary public ID for file management',
                            },
                            format: {
                                type: 'string',
                                oneOf: [
                                    { example: 'pdf', description: 'Document format' },
                                    { example: 'docx', description: 'Document format' },
                                    { example: 'jpg', description: 'Image format' },
                                    { example: 'png', description: 'Image format' },
                                ],
                            },
                            size: {
                                type: 'number',
                                example: 244717,
                                description: 'File size in bytes',
                            },
                            resourceType: {
                                type: 'string',
                                oneOf: [
                                    { example: 'raw', description: 'For documents (PDF, DOCX, etc.)' },
                                    { example: 'image', description: 'For images (JPG, PNG, etc.)' },
                                ],
                                enum: ['raw', 'image']
                            },
                            originalFilename: {
                                type: 'string',
                                example: 'assignment.pdf',
                                description: 'Original filename before processing',
                            },
                            createdAt: {
                                type: 'string',
                                example: '2025-11-27T12:18:16Z',
                                description: 'Upload timestamp in ISO format',
                            },
                        },
                        required: ['url', 'publicId', 'format', 'size', 'resourceType', 'originalFilename', 'createdAt']
                    },
                },
                required: ['success', 'message', 'data']
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request - Invalid file format or file too large',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'Invalid file format. Only PDF and DOCX files are allowed',
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
            status: 413,
            description: 'Payload Too Large - File size exceeds limit',
            schema: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        example: false,
                    },
                    message: {
                        type: 'string',
                        example: 'File size too large. Maximum allowed size is 10MB',
                    },
                    statusCode: {
                        type: 'number',
                        example: 413,
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
