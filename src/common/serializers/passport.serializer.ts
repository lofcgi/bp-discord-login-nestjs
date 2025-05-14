import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/users.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: any, id?: any) => void) {
    done(null, user.discordId); // 또는 user.id, user._id 등
  }

  async deserializeUser(id: string, done: (err: any, user?: any) => void) {
    try {
      const user = await this.usersService.findByDiscordId(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
}
