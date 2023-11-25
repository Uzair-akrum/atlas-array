import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as AWS from 'aws-sdk';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  AWS.config.update({
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
    region: 'your-region',
  });
  app.use(
    cors({
      origin: '*', // Specify the allowed origin
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
      credentials: true, // Enable credentials (cookies, authorization headers)
    }),
  );
  await app.listen(3000);
}
bootstrap();
