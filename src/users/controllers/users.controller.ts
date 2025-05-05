import { Body, Controller, Post } from '@nestjs/common';
import { UserRequestDto } from '../dto/users.request.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signUp(@Body() body: UserRequestDto) {
    return this.usersService.signUp(body);
  }
}
