import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async createUser(user: User) {
    const createdUser = await this.user.create(user);
    return createdUser;
  }
}
