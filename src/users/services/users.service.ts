import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRequestDto } from '../dto/users.request.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(body: UserRequestDto) {
    const { name, email, imgUrl } = body;
    const isUserExist = await this.usersRepository.findUserByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('이미 가입한 이메일입니다.');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      imgUrl,
    });
    return user.readOnlyData;
  }
}
