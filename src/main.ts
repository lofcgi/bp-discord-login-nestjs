import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Oauth2 login API')
    .setDescription('NestJS API description')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors({
    origin: true, // 추후 프론트엔드 주소로 변경
    credentials: true,
  });

  // redis 설정
  const redisClient = createClient({
    socket: {
      host: configService.get('redis.host'),
      port: configService.get('redis.port'),
    },
  });
  await redisClient.connect();

  // session 설정
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get('session.secret') as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30일
      },
    }),
  );

  await app.listen(configService.get('port') as number);
}
bootstrap();
