import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './modules/upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './modules/message/message.module';
import { DatabaseModule } from './common/database/database.provider';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UploadModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    MessageModule,
    DatabaseModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
