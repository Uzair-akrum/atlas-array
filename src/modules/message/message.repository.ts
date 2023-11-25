import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.entity';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(Message.name) private readonly message: Model<Message>,
  ) {}

  async createMessage(message: Message) {
    const createdMessage = await this.message.create(message);
    return createdMessage;
  }
}
