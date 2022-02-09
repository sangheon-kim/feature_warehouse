import { PickType } from '@nestjs/swagger';
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
