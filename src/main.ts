import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
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

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
      exceptionFactory: (errors) => {
        console.log('VALIDATION ERRORS:', errors);
        return new BadRequestException(errors);
      },
    }),
  );

  app.enableCors();

  process.env.TZ = '-03:00';

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
void bootstrap();
