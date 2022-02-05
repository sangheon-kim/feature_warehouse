import { CatRequestDto } from './dto/cats.request.dto';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  // 비밀번호 암호화
  async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // 비밀번호 비교
  async comparePassword(password1, password2): Promise<boolean> {
    return bcrypt.compare(password1, password2);
  }

  /**
   *
   * @description 회원가입
   * @param body
   */
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new HttpException('이미 존재하는 고양이입니다.', 400);
    }

    const hashedPassword = await this.hashedPassword(password);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
