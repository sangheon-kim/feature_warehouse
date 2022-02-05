import { CatsRepository } from './../cats/cats.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async jwtLogIn() {}
}
