import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createUser(@Body() user: User) {
    const createdUser = await this.userService.createUser(user);
    return createdUser;
  }
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Post('/login')
  async loginUser(@Body() user: User) {
    this.eventEmitter.emit('setSocket', user);
  }
}
