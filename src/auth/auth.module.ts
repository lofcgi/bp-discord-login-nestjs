import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { DiscordStrategy } from './utils/strategies/discord.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { RedisClientProvider } from 'src/common/redis/redis.provider';
import { SessionSerializer } from 'src/common/serializers/passport.serializer';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [
    AuthService,
    DiscordStrategy,
    SessionSerializer,
    RedisClientProvider,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
