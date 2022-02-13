import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../user.schema';

export class ReadOnlyUserDto extends PickType(User, [
  'email',
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

export class SendSMSAuthenticateResponse extends PickType(User, [] as const) {
  @ApiProperty({
    example: 'rb44k9rr1zshdt6co424e',
    description: '해쉬키',
  })
  hash_key: string;
}

export class CheckSMSAuthenticateResponse extends PickType(User, [] as const) {
  @ApiProperty({
    example: 'true',
    description: '인증성공',
  })
  isValidate: boolean;
}
