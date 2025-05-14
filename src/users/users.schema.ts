import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @Prop({ required: true, unique: true })
  @IsString()
  discordId: string;

  @Prop({ required: true })
  @IsString()
  username: string;

  @Prop()
  @IsEmail()
  email?: string;

  @Prop()
  avatar?: string;

  @Prop()
  accessToken?: string;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
