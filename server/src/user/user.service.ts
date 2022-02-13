import { HttpException, Injectable } from '@nestjs/common';
import {
  CheckSMSAuthenticatedDto,
  UserRequestDto,
} from './dto/user.request.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { HttpService } from '@nestjs/axios';
import { createHmac } from 'crypto';
import axios from 'axios';

interface SMSHash {
  hash_key: string;
  authenticatedNumber: string;
}

@Injectable()
export class UserService {
  smsResult: { [key: string]: SMSHash };
  constructor(
    private readonly userRepository: UserRepository,
    private readonly httpService: HttpService,
  ) {
    this.smsResult = {};
  }

  randNumber(length: number) {
    let numberStr = '';
    for (let i = 0; i < length; i++) {
      numberStr += Math.floor(Math.random() * 10);
    }

    return numberStr;
  }

  randHash() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

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

  async sendSMSAuthenticated(phoneNumber: string) {
    const randNumber = this.randNumber(6);
    const hash_key = this.randHash();

    const signature = await this.makeSignature();
    const headers = {
      'x-ncp-apigw-timestamp': new Date().getTime(),
      'x-ncp-iam-access-key': process.env.NAVER_CLOUD_PLATFORM_ACCESS_KEY,
      'x-ncp-apigw-signature-v2': signature,
    };

    const body = {
      content: `[상헌 API] 인증번호 [${randNumber}]를 입력해주세요.`,
      from: '01022848367',
      countryCode: '82',
      messages: [
        {
          to: phoneNumber,
        },
      ],
      type: 'SMS',
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

      this.smsResult[phoneNumber] = {
        hash_key,
        authenticatedNumber: randNumber,
      };

      return {
        hash_key,
      };
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async checkSMSAuthenticate(body: CheckSMSAuthenticatedDto) {
    const {
      hash_key: reqHashKey,
      authenticatedNumber: reqAuthenticatedNumber,
      phoneNumber,
    } = body;

    const { hash_key, authenticatedNumber } = this.smsResult[phoneNumber] || {};

    console.log({
      body,
      sms: this.smsResult[phoneNumber],
    });

    const isCorrectHashKey = reqHashKey === hash_key;
    if (!isCorrectHashKey) {
      throw new HttpException('해쉬값이 올바르지 않습니다.', 400);
    }
    const isCorrectAuthenticatedNumber =
      reqAuthenticatedNumber === authenticatedNumber;
    if (!isCorrectAuthenticatedNumber) {
      throw new HttpException('인증번호가 올바르지 않습니다.', 400);
    }

    if (isCorrectHashKey && isCorrectAuthenticatedNumber) {
      this.smsResult[phoneNumber] = null;
      delete this.smsResult[phoneNumber];
      return {
        isValidate: isCorrectHashKey && isCorrectAuthenticatedNumber,
      };
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
