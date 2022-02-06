import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { UserRequestDto } from 'src/user/dto/user.request.dto';
import { ReadOnlyUserDto } from './dto/user.dto';

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
}
