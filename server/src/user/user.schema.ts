import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'ksj8367@gmail.com',
    description: '이메일',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '01022848367',
    description: '휴대폰번호',
  })
  @Prop({
    unique: true,
  })
  @MinLength(8)
  @MaxLength(20)
  telNumber: string;

  @ApiProperty({
    example: '홍길동',
    description: '이름',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'LO',
    description: '플랫폼명 - K - 카카오, N - 네이버, G - 구글, LO - 로컬',
    enum: ['K', 'N', 'G', 'LO'],
    required: true,
  })
  @Prop({
    default: 'LO',
  })
  @IsString()
  @IsNotEmpty()
  platform: 'K' | 'N' | 'G' | 'LO';

  @ApiProperty({
    example: '123456',
    description: '비밀번호 (로컬의 경우 필요)',
  })
  @Prop({})
  @MinLength(8)
  @MaxLength(20)
  @IsString()
  password: string;

  @ApiProperty({
    example: '닉네임123',
    description: '닉네임',
  })
  @Prop({})
  @MinLength(2)
  @MaxLength(10)
  @IsString()
  nickname: string;

  @ApiProperty({
    example: '1',
    description: '성별 (1 - 남자, 2 - 여자, 3 - 기타)',
    enum: ['1', '2', '3'],
  })
  @MaxLength(1)
  @Prop({})
  @IsString()
  gender: '1' | '2' | '3';

  @ApiProperty({
    example: '950906',
    description: '생년월일',
  })
  @Length(6)
  @Prop({})
  @IsString()
  birth: string;

  @ApiProperty({
    example: '나는 개발자 입니다.',
    description: '간단한 자기소개',
  })
  @MaxLength(100)
  @Prop({})
  @IsString()
  bio: string;

  @ApiProperty({
    example: '1',
    description: '개인정보 활용 동의 (1 - 동의, 2 - 동의 안함)',
  })
  @Prop({
    default: '1',
  })
  @IsEnum(['1', '2'])
  isTermPrivacy: '1' | '2';

  @ApiProperty({
    example: '2',
    description: '마케팅 정보 활용 동의 (1 - 동의, 2 - 동의 안함)',
  })
  @Prop({
    default: '2',
  })
  isMarketingPrivacy: '1' | '2';

  @ApiProperty({
    example: '2',
    description: '3자 정보 제공 동의 (1 - 동의, 2 - 동의 안함)',
  })
  @Prop({
    default: '2',
  })
  isThirdPartyPrivacy: '1' | '2';

  @ApiProperty({
    example:
      'https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png',
    description: '프로필 썸네일',
    default:
      'https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png',
  })
  @Prop({
    default:
      'https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png',
  })
  @IsString()
  thumbnail: string;

  readonly readOnlyData: {
    email: string;
    telNumber: string;
    platform: string;
    name: string;
    nickname: string;
    gender: '1' | '2' | '3';
    birth: string;
    bio: string;
    isTermPrivacy: '1' | '2';
    isMarketingPrivacy: '1' | '2';
    isThirdPartyPrivacy: '1' | '2';
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readOnlyData').get(function (this: User & ITimeStamp) {
  return {
    email: this.email,
    telNumber: this.telNumber,
    platform: this.platform,
    name: this.name,
    nickname: this.nickname,
    gender: this.gender,
    birth: this.birth,
    bio: this.bio,
    isTermPrivacy: this.isTermPrivacy,
    isMarketingPrivacy: this.isMarketingPrivacy,
    isThirdPartyPrivacy: this.isThirdPartyPrivacy,
    thumbnail: this.thumbnail,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
});
