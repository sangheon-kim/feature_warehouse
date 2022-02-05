import { CatsService } from 'src/cats/cats.service';
import { CatRequestDto } from 'src/cats/dto/cats.request.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positive-int.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Request } from 'express';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCats(@Req() req: Request) {
    // console.log(req.user);
    return req.user;
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) id: number) {
    return 'get one cat api';
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
  })
  @Post('/login')
  async login(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogIn(body);
    // return 'login';
  }
}
