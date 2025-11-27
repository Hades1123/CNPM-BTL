import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse, CloudinaryFullResponse } from './dto/cloudinary-response';
import { createReadStream } from 'streamifier';

@Injectable()
export class CloudinaryService {
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            // Check file type to determine resource_type
            const isImage = file.mimetype.startsWith('image/');
            const resourceType = isImage ? 'image' : 'raw';

            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: resourceType,
                    format: isImage ? undefined : file.originalname.split('.').pop(),
                },
                (error, result: CloudinaryFullResponse) => {
                    if (error) return reject(error);

                    // Filter only important information
                    const filteredResponse: CloudinaryResponse = {
                        url: result?.secure_url,
                        publicId: result?.public_id,
                        format: result?.format,
                        size: result?.bytes,
                        resourceType: result?.resource_type,
                        originalFilename: result?.original_filename,
                        createdAt: result?.created_at,
                    };

                    resolve(filteredResponse);
                },
            );

            createReadStream(file.buffer).pipe(uploadStream);
        });
    }
}
