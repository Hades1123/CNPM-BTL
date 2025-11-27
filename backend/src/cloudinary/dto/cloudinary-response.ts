import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type CloudinaryFullResponse = UploadApiResponse | UploadApiErrorResponse | undefined;

export interface CloudinaryResponse {
    url: string;
    publicId: string;
    format: string;
    size: number;
    resourceType: string;
    originalFilename: string;
    createdAt: string;
}
