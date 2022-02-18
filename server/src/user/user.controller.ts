import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import {
  UserRequestDto,
  SendSMSAuthenticatedDto,
  CheckSMSAuthenticatedDto,
} from 'src/user/dto/user.request.dto';
import {
  ReadOnlyUserDto,
  SendSMSAuthenticateResponse,
  CheckSMSAuthenticateResponse,
} from './dto/user.dto';

@ApiTags('유저 API')
@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  private _redirectPath: string;
  private _KAKAO_HOST: string;
  private _KAKAO_REDIRECT_URL: string;
  constructor(private readonly userService: UserService) {
    this._redirectPath = '/user/kakao/oauth';
    this._KAKAO_HOST = 'https://kauth.kakao.com';
    this._KAKAO_REDIRECT_URL = `http://localhost:8000${this._redirectPath}`;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 400,
    description: '중복된 이메일이 존재하는 경우',
  })
  @ApiResponse({
    status: 200,
    description: '회원가입 성공',
    type: ReadOnlyUserDto,
  })
  @Post('/join')
  async signUp(@Body() body: UserRequestDto) {
    return this.userService.signUp(body);
  }

  @Get('/kakao/login')
  @Header('Content-Type', 'text/html')
  kakaoLogin(@Res() res): void {
    const url = `${this._KAKAO_HOST}/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${this._KAKAO_REDIRECT_URL}&response_type=code`;
    return res.redirect(url);
  }

  @Get('/kakao/oauth')
  @Header('Content-Type', 'text/html')
  async kakaoRedirect(@Query('code') code, @Res() res) {
    const html = await this.userService.kakaoLogin(code);
    return res.send(html);
  }

  @ApiOperation({ summary: '인증번호 전송' })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 400,
    description: '핸드폰 번호 타입이 올바르지 않습니다.',
  })
  @ApiResponse({
    status: 200,
    description: '인증문자 전송 성공',
    type: SendSMSAuthenticateResponse,
  })
  @Post('/sms')
  async sendSMSAuthenticate(@Body() body: SendSMSAuthenticatedDto) {
    return this.userService.sendSMSAuthenticated(body.phoneNumber);
  }

  @ApiOperation({ summary: '인증번호 확인' })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 200,
    description: '휴대폰 인증 성공',
    type: CheckSMSAuthenticateResponse,
  })
  @Put('/sms')
  async checkSMSAuthenticate(@Body() body: CheckSMSAuthenticatedDto) {
    return this.userService.checkSMSAuthenticate(body);
  }
}
