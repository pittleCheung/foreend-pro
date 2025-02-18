import { In, Like, Raw, MongoRepository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.mongo.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FeishuUserInfo } from './feishu/feishu.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  async createOrUpdateByFeishu(feishuUserInfo: FeishuUserInfo) {
    return await this.userRepository.save(feishuUserInfo);
  }

  createOrSave(user) {
    return this.userRepository.save(user);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
