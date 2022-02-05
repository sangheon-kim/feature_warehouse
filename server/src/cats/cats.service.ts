import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  signUp(body: CatRequestDto) {
    console.log(body);
  }
}
