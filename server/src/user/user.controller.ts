import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { Body, Controller, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import {
  UserRequestDto,
  SendSMSAuthenticatedDto,
  CheckSMSAuthenticatedDto,
} from 'src/user/dto/user.request.dto';
import { ReadOnlyUserDto, SendSMSAuthenticateResponse } from './dto/user.dto';

@ApiTags('유저 API')
@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    type: SendSMSAuthenticateResponse,
  })
  @Put('/sms')
  async checkSMSAuthenticate(@Body() body: CheckSMSAuthenticatedDto) {
    return this.userService.checkSMSAuthenticate(body);
  }
}
