import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGOOSE_USERID}:${process.env.MONGOOSE_PASSWORD}@cluster0.gqmop.mongodb.net/${process.env.MONGOOSE_DB_NAME}?retryWrites=true&w=majority`,
    ),
    CatsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', process.env.NODE_ENV === 'development');
  }
}
