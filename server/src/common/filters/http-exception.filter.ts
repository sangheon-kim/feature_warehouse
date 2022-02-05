import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException & T, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const error = exception.getResponse();

    // 에러 메시지 규격
    res.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(typeof error !== 'string' ? { ...error } : { error }),
    });
  }
}
