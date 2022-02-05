import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });

    return cat;
  }

  /**
   * 이메일로 해당 고양이 있는지 확인
   */
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });

    return result as boolean;
  }

  /**
   * 고양이 추가
   */
  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
