import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users.schema';
import { PickType } from '@nestjs/swagger';

export class ReadOnlyUserDto extends PickType(User, [
  'name',
  'email',
  'imgUrl',
] as const) {
  @ApiProperty({
    example: '35123',
    description: 'id',
    required: true,
  })
  id: string;
}
