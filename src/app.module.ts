import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './modules/upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './modules/message/message.module';
import { DatabaseModule } from './common/database/database.provider';
import { UserModule } from './modules/user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Server } from 'socket.io';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
@Module({
  imports: [
    UploadModule,
    EventEmitterModule.forRoot(),
    forwardRef(() =>
      GraphQLModule.forRootAsync<ApolloDriverConfig>({
        driver: ApolloDriver,
        useFactory: () => ({
          typePaths: ['./**/*.graphql'],
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          definitions: {
            path: join(
              process.cwd(),
              '/src/common/generate/generatetypings.ts',
            ),
            outputAs: 'class',
          },
        }),
      }),
    ),

    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    MessageModule,
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
