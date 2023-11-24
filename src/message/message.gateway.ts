import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@WebSocketGateway({
  path: '/socket.io',
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    // await this.messageService.create(createMessageDto);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, [data]: any) {
    console.log(
      '🚀 ~ file: message.gateway.ts:31 ~ MessageGateway ~ handleJoinRoom ~ client:',
      client,
    );
    try {
      const { userId, recieverId, msg } = data;
      client.emit('newMessage', msg);
    } catch (err) {
      console.log(
        '🚀 ~ file: message.gateway.ts:33 ~ MessageGateway ~ handleJoinRoom ~ err:',
        err,
      );
    }
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messageService.findOne(id);
  }

  @SubscribeMessage('newMessage')
  newMessage(client: Socket, data: any) {
    const { room } = data;
    console.log(
      '🚀 ~ file: message.gateway.ts:54 ~ MessageGateway ~ newMessage ~ room:',
      room,
    );
    client.join(room);
 

    this.server.emit('event', data);
  }
}
