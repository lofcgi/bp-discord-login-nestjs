import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-discord';
import { UsersService } from 'src/users/services/users.service';
import { ConfigService } from '@nestjs/config';
import { DiscordProfile } from 'src/auth/types/discord.type';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      clientID: configService.get('DISCORD_CLIENT_ID') as string,
      clientSecret: configService.get('DISCORD_CLIENT_SECRET') as string,
      callbackURL: configService.get('DISCORD_CALLBACK_URL') as string,
      scope: ['identify', 'email', 'guilds'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // 사용자 정보 추출
    const { id, username, email, avatar } = profile as DiscordProfile;
    // 사용자 조회
    let user = await this.usersService.findByDiscordId(id);

    if (!user) {
      user = await this.usersService.create({
        discordId: id,
        username,
        email,
        avatar,
        accessToken,
        refreshToken,
      });
    } else {
      user = await this.usersService.update(id, {
        username,
        email,
        avatar,
        accessToken,
        refreshToken,
      });
    }

    return user;
  }
}
