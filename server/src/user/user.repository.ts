import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserRequestDto } from './dto/user.request.dto';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  /** 이메일 존재 여부 확인 */
  async existsByEmail(email: string): Promise<boolean> {
    const result = (await this.userModel.exists({ email })) as boolean;

    return result;
  }

  /** 유저 생성 */
  async createUser(user: UserRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
