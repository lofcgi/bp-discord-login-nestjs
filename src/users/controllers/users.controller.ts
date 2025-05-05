import { Body, Controller, Post } from '@nestjs/common';
import { UserRequestDto } from '../dto/users.request.dto';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: '회원가입 성공',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: UserRequestDto) {
    return this.usersService.signUp(body);
  }
}
