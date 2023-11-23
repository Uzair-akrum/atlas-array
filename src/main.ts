import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as AWS from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  AWS.config.update({
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
    region: 'your-region',
  });
  await app.listen(3000);
}
bootstrap();
