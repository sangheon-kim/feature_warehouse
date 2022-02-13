import { ApiProperty, PickType } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { User } from '../user.schema';

export class UserRequestDto extends PickType(User, [
  'email',
  'password',
  'telNumber',
  'platform',
  'name',
  'nickname',
  'gender',
  'birth',
  'bio',
  'thumbnail',
  'isTermPrivacy',
  'isMarketingPrivacy',
  'isThirdPartyPrivacy',
] as const) {}

export class SendSMSAuthenticatedDto extends PickType(User, [] as const) {
  @ApiProperty({
    example: '01022848367',
    description: '핸드폰 번호',
  })
  phoneNumber: string;
}

export class CheckSMSAuthenticatedDto extends PickType(User, [] as const) {
  @ApiProperty({
    example: '01022848367',
    description: '핸드폰 번호',
  })
  phoneNumber: string;

  @ApiProperty({
    example: 'rb44k9rr1zshdt6co424e',
    description: '해쉬키',
  })
  hash_key: string;

  @ApiProperty({
    example: '345070',
    description: '인증번호',
  })
  @Length(6)
  authenticatedNumber: string;
}
