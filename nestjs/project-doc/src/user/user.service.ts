import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user1.entity';
import { Res } from './res.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Res)
    private resRepository: Repository<Res>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(data: { [propName: string]: any }): Promise<User> {
    return await this.usersRepository.save(data);
  }

  // 查询全部的数据
  async userList(): Promise<User[]> {
    console.log('获取用户数据');
    return await this.usersRepository.find();
  }

  async resList(): Promise<Res[]> {
    console.log('获取resList用户数据');
    return await this.resRepository.find();
  }

  findOne(id: any): Promise<User> {
    return this.usersRepository.findOne(id);
  }
}
