import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class-validation 적용 처리
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
  }); // cors 허용

  // multer 파일에 접근할 수 있는 것이다. (http://localhost:8000/media/cats/aaa.png)
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media', // uploads폴더를 /media로 접근가능하게 해주는 것.
  });

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
