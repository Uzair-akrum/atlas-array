// database.provider.ts

import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        getMongoConfig(configService),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class DatabaseModule {}
