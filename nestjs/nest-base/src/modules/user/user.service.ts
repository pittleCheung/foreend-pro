import { Injectable, Post, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Injectable()
// @UseGuards(AuthGuard) // 在控制器层面控制
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  // async userList(): Promise<any[]> {
  //   return [
  //     {
  //       id: 0,
  //       name: '张三',
  //     },
  //     {
  //       id: 1,
  //       name: '李四',
  //     },
  //   ];
  // }

  // 创建数据,传递一个对象类型的数据
  // @UseGuards(AuthGuard) // 接口层面控制 该接口被守卫了
  async createUser(data: { [propName: string]: any }): Promise<User> {
    return await this.userRepository.save(data);
  }

  // 查询全部的数据
  async userList(): Promise<User[]> {
    console.log('获取用户数据');
    return await this.userRepository.find();
  }
}
