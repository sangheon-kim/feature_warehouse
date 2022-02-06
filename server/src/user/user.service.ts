import { HttpException, Injectable } from '@nestjs/common';
import { UserRequestDto } from './dto/user.request.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /** 비밀번호 암호화 */
  async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /** 회원가입 */
  async signUp(body: UserRequestDto) {
    const { email, password, ...rest } = body;

    const isUserExist = await this.userRepository.existsByEmail(email);

    if (isUserExist) {
      throw new HttpException('이미 존재하는 이메일입니다.', 400);
    }

    const hashedPassword = await this.hashedPassword(password || '');

    const user = await this.userRepository.createUser({
      email,
      platform: 'LO',
      password: hashedPassword,
      ...rest,
    });
  }
}
