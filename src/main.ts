import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('saat')
    .setDescription('Projeto saat')
    .setContact('Saat-scheduling', '', 'Benner Dias')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  process.env.TZ = '-03:00';

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
void bootstrap();
