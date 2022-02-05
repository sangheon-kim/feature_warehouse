import { ApiProperty } from '@nestjs/swagger';

export class ReadOnlyCatDto {
  @ApiProperty({
    example: '123456',
    description: 'id',
  }) // swagger response Body
  id: string;

  @ApiProperty({
    example: 'ksj8367@gmail.com',
    description: '이메일',
  })
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '이름',
  })
  name: string;

  @ApiProperty({
    example: '2022-01-05T05:54:20.080Z',
    description: '생성일자',
  })
  createdAt: string;

  @ApiProperty({
    example: '2022-02-05T05:54:20.080Z',
    description: '수정일자',
  })
  updatedAt: string;
}
