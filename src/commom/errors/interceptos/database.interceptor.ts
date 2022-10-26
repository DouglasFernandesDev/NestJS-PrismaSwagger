import { isPrismaError } from './../utils/is-prisma-error.util';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { handleDatabaseError } from '../utils/handle.database.errors.utils';
import { DatabaseError } from '../types/DatabaseError';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaError(error)) {
          error = handleDatabaseError(error);
        }
        if (error instanceof DatabaseError) {
          throw new BadRequestException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
