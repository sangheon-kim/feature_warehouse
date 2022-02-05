import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true, // createdAt, updatedAt 자동
};

@Schema(options)
export class Cat extends Document {
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
    example: '123456',
    description: '비밀번호',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat & ITimeStamp) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
});
