import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationException } from '@/common/exceptions/validation.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let responseObj: any = null;

    if (exception instanceof ValidationException) {
      // Handle validation exceptions directly to preserve structure
      const response = exception.getResponse() as any;
      responseObj = {
        ...response,
        timestamp: new Date().toISOString(),
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        responseObj = exceptionResponse as any;
        message = responseObj.message || responseObj.error || message;

        // If message is an array, take the first element
        if (Array.isArray(message)) {
          message = message[0];
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // If responseObj is set (validation exception), use it directly
    if (responseObj) {
      return response.status(status).json(responseObj);
    }

    response.status(status).json({
      success: false,
      message: message,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}