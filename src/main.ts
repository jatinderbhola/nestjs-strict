import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Setup Swagger with Fastify
  const config = new DocumentBuilder()
    .setTitle('Shipping XP API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('Shipping')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // End of Swagger setup

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
