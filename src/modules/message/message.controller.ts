import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { MessageGateway } from './message.gateway';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageGateway: MessageGateway,
  ) {}

  @Post()
  async createMessage(@Body() message: Message) {
    const createdMessage = await this.messageService.create(message);
    

    return createdMessage;
  }
}
