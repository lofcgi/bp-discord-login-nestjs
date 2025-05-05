import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'username',
    description: 'user nickname',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'username@gmail.com',
    description: 'user email',
    required: true,
  })
  @Prop({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'user image url',
    required: true,
  })
  @Prop({ required: true })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    name: string;
    email: string;
    imgUrl: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    name: this.name,
    email: this.email,
    imgUrl: this.imgUrl,
  };
});
