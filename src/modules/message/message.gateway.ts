import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  path: '/socket.io',
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  private readonly clients: Map<string, Socket> = new Map();
  @WebSocketServer()
  server: Server;
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    await this.messageService.create(createMessageDto);
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

  @SubscribeMessage('newMessage')
  async newMessage(client: Socket, data: any) {
    console.log(
      '🚀 ~ file: message.gateway.ts:57 ~ MessageGateway ~ newMessage ~ data:',
      data,
    );
  }
  @SubscribeMessage('sendMesage')
  async sendMessage(client: Socket, data: any) {
    const { reciever, sender, message } = data;
    // await this.messageService.create(message);

    const recievingClient = this.clients.get(reciever);
    if (recievingClient) {
      console.log('rhwoign');
      recievingClient.emit('newMessage', data);
    }
  }
  getAllRoom() {
    const adapter = this.server.of('/').adapter;

    const allRooms = Array.from(adapter.rooms.keys());
  }

  @SubscribeMessage('intiliazeSocket')
  intiliazeSocket(client: Socket, [data]) {
    const { email } = data;
    console.log(
      '🚀 ~ file: message.gateway.ts:75 ~ MessageGateway ~ intiliazeSocket ~ email:',
      email,
    );
    this.clients.set(email, client);
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
