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
  async handleJoinRoom(client: Socket, room: any) {
    client.join(room);
    const usersInRoom = await this.server.in(room).fetchSockets();
    console.log(
      '🚀 ~ file: message.gateway.ts:59 ~ MessageGateway ~ newMessage ~ usersInRoom:',
      usersInRoom,
    );

    try {
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

  @SubscribeMessage('sendMesage')
  async newMessage(client: Socket, data: any) {
    const { room, message } = data;

    await this.server.to(room).emit('event', message);
  }
  getAllRoom() {
    const adapter = this.server.of('/').adapter;

    const allRooms = Array.from(adapter.rooms.keys());
    console.log(
      '🚀 ~ file: message.gateway.ts:57 ~ MessageGateway ~ newMessage ~ allRooms:',
      allRooms,
    );
  }
  getUsersInRoom(io, room) {
    const adapter = io.of('/').adapter;
    const roomSockets = adapter.rooms.get(room) || new Set();
    const usersInRoom = Array.from(roomSockets).map(
      (socketId) => io.sockets.sockets.get(socketId).id,
    );
    return usersInRoom;
  }
}
