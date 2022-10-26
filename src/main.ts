import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundInterceptor } from './commom/errors/interceptos/notfound.interceptor';
import { UnauthorizedInterceptor } from './commom/errors/interceptos/unauthorized.interceptor';
import { HttpExceptionFilter } from './commom/filters/http.exception.filter';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || PORT);
}
bootstrap();
