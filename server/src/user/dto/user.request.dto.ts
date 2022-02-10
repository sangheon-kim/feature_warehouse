import { ApiProperty, PickType } from '@nestjs/swagger';
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
  telNumber: string;
}
