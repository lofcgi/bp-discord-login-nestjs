import { Provider } from '@nestjs/common';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

export const RedisClientProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: async (configService: ConfigService) => {
    const client = createClient({
      socket: {
        host: configService.get('REDIS_HOST') as string,
        port: configService.get('REDIS_PORT') as number,
      },
    });
    await client.connect();
    return client;
  },
  inject: [ConfigService],
};
