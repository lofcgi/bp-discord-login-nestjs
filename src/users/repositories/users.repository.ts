import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findByDiscordId(discordId: string): Promise<User | null> {
    return this.userModel.findOne({ discordId });
  }

  async update(discordId: string, user: Partial<User>): Promise<User | null> {
    return this.userModel.findOneAndUpdate({ discordId }, user, {
      new: true,
    });
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async updateDiscordToken(
    discordId: string,
    accessToken: string,
    refreshToken: string,
  ): Promise<User | null> {
    return this.userModel.findOneAndUpdate(
      { discordId },
      { accessToken, refreshToken },
      { new: true },
    );
  }
}
