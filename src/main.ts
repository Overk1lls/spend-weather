import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
    }),
  );
  app.useGlobalFilters(new HttpErrorFilter());

  const openApi = new DocumentBuilder()
    .setTitle('Spendbase Weather API')
    .setDescription('A weather API for Spendbase')
    .setVersion('1.0')
    .addTag('weather')
    .build();
  const swagger = SwaggerModule.createDocument(app, openApi);
  SwaggerModule.setup('docs', app, swagger);

  await app.listen(3000);
}
bootstrap();
