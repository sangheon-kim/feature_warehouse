import { HttpException, Injectable } from '@nestjs/common';
import { UserRequestDto } from './dto/user.request.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { HttpService } from '@nestjs/axios';
import CryptoJS, { createHmac, createHash } from 'crypto';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly httpService: HttpService,
  ) {}

  async makeSignature() {
    const method = 'POST';
    const url = `/sms/v2/services/${process.env.NAVER_CLOUD_PLATFORM_SERVICE_ID}/messages`;

    const hmac = createHmac(
      'sha256',
      process.env.NAVER_CLOUD_PLATFORM_SECRET_KEY,
    );

    hmac.update(method);
    hmac.update(' ');
    hmac.update(url);
    hmac.update('\n');
    hmac.update(Date.now().toString());
    hmac.update('\n');
    hmac.update(process.env.NAVER_CLOUD_PLATFORM_ACCESS_KEY);
    const hash = hmac.digest();
    const signature = hash.toString('base64');

    return signature;
  }

  /** 비밀번호 암호화 */
  async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async sendSMSAuthenticated() {
    const signature = await this.makeSignature();
    const headers = {
      'x-ncp-apigw-timestamp': new Date().getTime(),
      'x-ncp-iam-access-key': process.env.NAVER_CLOUD_PLATFORM_ACCESS_KEY,
      'x-ncp-apigw-signature-v2': signature,
    };
    const body = {
      content: `문자 보내기 API 연동 성공 By Sangheon Kim`,
      subject: '',
      from: '01022848367',
      countryCode: '82',
      messages: [
        {
          to: '01022848367',
        },
      ],
      type: 'sms',
      contentType: 'COMM',
    };

    try {
      await axios.post(
        `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.NAVER_CLOUD_PLATFORM_SERVICE_ID}/messages`,
        body,
        {
          headers,
        },
      );
    } catch (err) {
      console.log(err);
    }
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

    return user.readOnlyData;
  }
}
