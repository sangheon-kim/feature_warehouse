import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? 'envs/.env.dev' : 'envs/.env',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGOOSE_USERID}:${process.env.MONGOOSE_PASSWORD}@cluster0.gqmop.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
