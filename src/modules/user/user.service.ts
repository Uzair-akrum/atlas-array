import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(user: User) {
    const createdUser = await this.userRepo.createUser(user);
    return createdUser;
  }
}
