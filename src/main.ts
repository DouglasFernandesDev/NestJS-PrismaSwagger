import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './commom/errors/interceptos/conflict.interceptor';
import { DatabaseInterceptor } from './commom/errors/interceptos/database.interceptor';
import { NotFoundInterceptor } from './commom/errors/interceptos/notfound.interceptor';
import { UnauthorizedInterceptor } from './commom/errors/interceptos/unauthorized.interceptor';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Simple Blog')
    .setDescription('The simple Blog API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  await app.listen(process.env.PORT || PORT);
}
bootstrap();
