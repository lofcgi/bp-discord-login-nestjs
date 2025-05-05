import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UserRequestDto extends PickType(User, [
  'name',
  'email',
  'imgUrl',
] as const) {}
