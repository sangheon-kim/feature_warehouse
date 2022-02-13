import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...');

    return next.handle().pipe(
      map((data) => ({
        success: true,
        ...(typeof data === 'string' ? { data } : data),
      })),
    );
  }
}
