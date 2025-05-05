import { IsEmail, IsString } from 'class-validator';

export class UserRequestDto {
  @IsString()
  @IsEmail()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  imgUrl: string;
}
