import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || PORT);
}
bootstrap();
