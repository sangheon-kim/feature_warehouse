import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '123456',
    description: 'id',
  }) // swagger response Body
  id: string;

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
