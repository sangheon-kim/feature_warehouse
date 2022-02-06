import { muilterOptions } from './../common/utils/multer.options';
import { CatsService } from 'src/cats/cats.service';
import { CatRequestDto } from 'src/cats/dto/cats.request.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { LoginResponseDto } from 'src/auth/dto/login.response.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기 (내정보)' })
  @ApiResponse({
    status: 200,
    description: '고양이 정보 가져오기 성공',
    type: ReadOnlyCatDto,
  })
  @ApiResponse({
    status: 401,
    description: '올바르지 않은 토큰',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  @ApiOperation({ summary: '회원가입' }) // Swagger 문서 title
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
    type: ReadOnlyCatDto,
  })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 401,
    description: '로그인 실패',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: LoginResponseDto,
  })
  @Post('/login')
  async login(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogIn(body);
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload')
  @UseInterceptors(FilesInterceptor('images', 10, muilterOptions('cats')))
  async uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
