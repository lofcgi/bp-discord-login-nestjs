import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  await app.listen(configService.get('port') || 8000);
}
bootstrap();
