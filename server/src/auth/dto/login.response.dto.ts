import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzQ1Njc4QG5hdmVyLmNvbSIsInN1YiI6IjYxZmUyYjFiN2Q1Mzk1NDRjYmY2NjFjNSIsImlhdCI6MTY0NDA1MjE0NiwiZXhwIjoxNjc1NjA5NzQ2fQ.6toC8cYF7NO2TblovLCjDMVLYoAave7_6zt0wekc_ks',
    description: 'jwt_token',
  })
  token: string;
}
