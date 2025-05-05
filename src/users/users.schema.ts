import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsEmail()
  email: string;

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
