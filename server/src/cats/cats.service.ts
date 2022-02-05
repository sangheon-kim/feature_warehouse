import { CatRequestDto } from './dto/cats.request.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  /**
   *
   * @description 회원가입
   * @param body
   */
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new HttpException('이미 존재하는 고양이입니다.', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
