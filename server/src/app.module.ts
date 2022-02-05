import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? 'envs/.env.dev' : 'envs/.env',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGOOSE_USERID}:${process.env.MONGOOSE_PASSWORD}@cluster0.gqmop.mongodb.net/${process.env.MONGOOSE_DB_NAME}?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
