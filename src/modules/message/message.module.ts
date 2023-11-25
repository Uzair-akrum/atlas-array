import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageRepository } from './message.repository';
import { Message, MessageSchema } from './message.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageGateway, MessageService, Message, MessageRepository],
  exports: [Message],
})
export class MessageModule {}
