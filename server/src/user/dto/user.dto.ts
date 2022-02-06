import { PickType } from '@nestjs/swagger';
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
