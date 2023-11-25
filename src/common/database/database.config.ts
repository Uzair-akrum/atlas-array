// mongo.config.ts

import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (configService: ConfigService) => ({
  uri: configService.get('MONGODB_URI'),
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
