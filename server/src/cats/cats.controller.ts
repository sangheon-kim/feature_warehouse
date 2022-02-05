import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
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
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positive-int.pipe';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  @Get()
  getAllCat() {
    return 'get all cat api';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) id: number) {
    console.log(id);
    return 'get one cat api';
  }

  @Post()
  async signUp(@Body() body) {
    console.log(body);
    return 'create cat api';
  }

  @Put(':id')
  updateCat() {
    return 'update cat api';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update partial cat api';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete service';
  }
}
