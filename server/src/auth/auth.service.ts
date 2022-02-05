import { CatsRepository } from 'src/cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { CatsService } from 'src/cats/cats.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly catsService: CatsService,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // * 해당하는 email이 있는지 확인

    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const isPasswordValidated: boolean = await this.catsService.comparePassword(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload = { email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload), // jwtToken 생성
    };
  }
}
