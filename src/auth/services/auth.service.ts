import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { DiscordTokenResponse } from '../types/discord.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    private readonly configService: ConfigService,
  ) {}

  // 사용자 검증 및 세션 정보 반환
  async validateUser(discordId: string) {
    return this.usersRepository.findByDiscordId(discordId);
  }

  async logout(req: Request, res: Response) {
    try {
      if (!req.session) {
        throw new Error('Session not found');
      }

      const sessionId = req.session.id;
      if (sessionId) {
        await this.redisClient.del('sess:' + sessionId);
      }

      // 세션 파괴
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destroy error:', err);
        }
      });

      res.clearCookie('connect.sid', {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV'),
        sameSite: 'lax',
        path: '/',
      });

      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async status(req: Request) {
    const sessionId = req.session.id;
    const session = await this.redisClient.get('sess:' + sessionId);
    if (!session) {
      return {
        isAuthenticated: false,
        user: null,
      };
    }
    const userDB = await this.usersRepository.findByDiscordId(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      JSON.parse(session).user as string,
    );
    if (!userDB) {
      return {
        isAuthenticated: false,
        user: null,
      };
    }
    return {
      isAuthenticated: true,
      user: {
        id: userDB.discordId,
        username: userDB.username,
        email: userDB.email,
        avatar: userDB.avatar,
      },
    };
  }

  /**
   * Discord refreshToken으로 accessToken 재발급
   */
  async refreshDiscordToken(discordId: string) {
    const clientId = this.configService.get('DISCORD_CLIENT_ID') as string;
    const clientSecret = this.configService.get(
      'DISCORD_CLIENT_SECRET',
    ) as string;
    const callbackURL = this.configService.get(
      'DISCORD_CALLBACK_URL',
    ) as string;

    const userDB = await this.usersRepository.findByDiscordId(discordId);
    if (!userDB) {
      throw new Error('User not found');
    }

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', userDB.refreshToken as string);
    params.append('redirect_uri', callbackURL);
    params.append('scope', 'identify email guilds');

    const response = await axios.post<DiscordTokenResponse>(
      'https://discord.com/api/oauth2/token',
      params,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    await this.usersRepository.updateDiscordToken(
      discordId,
      response.data.access_token,
      response.data.refresh_token,
    );
  }
}
