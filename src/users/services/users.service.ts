import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRequestDto } from '../dto/users.request.dto';
import { User } from '../users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  async signUp(body: UserRequestDto) {
    const { name, email, imgUrl } = body;
    const isUserExist = await this.usersModel.exists({ email });

    if (isUserExist) {
      throw new UnauthorizedException('이미 가입한 이메일입니다.');
    }

    const user = await this.usersModel.create({
      name,
      email,
      imgUrl,
    });
    return user.readOnlyData;
  }
}
