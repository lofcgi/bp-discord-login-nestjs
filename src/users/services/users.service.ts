import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByDiscordId(discordId: string): Promise<User | null> {
    return this.usersRepository.findByDiscordId(discordId);
  }

  async create(user: Partial<User>): Promise<User> {
    return this.usersRepository.create(user);
  }

  async update(discordId: string, user: Partial<User>): Promise<User | null> {
    return this.usersRepository.update(discordId, user);
  }
}
