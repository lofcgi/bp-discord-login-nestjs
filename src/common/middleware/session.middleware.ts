import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import * as session from 'express-session';
import { RedisStore } from 'connect-redis';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    session({
      store: new RedisStore({ client: this.redisClient }),
      secret: this.configService.get('SESSION_SECRET') as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30일
      },
    })(req, res, next);
  }
}
