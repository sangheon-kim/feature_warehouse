import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class-validation 적용 처리
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: true,
    credentials: true,
  }); // cors 허용

  const config = new DocumentBuilder()
    .setTitle(`Sangheon's API warehouse`)
    .setDescription('상헌이의 API 창고')
    .setVersion(`v 0.0.1`)
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // 첫번쨰 인수가 parameter값

  await app.listen(process.env.PORT);
}
bootstrap();
