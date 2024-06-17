import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { User } from './user1.entity';
import { UserService } from './user.service';
import { Res } from './res.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() data: { [propName: string]: any }): Promise<User> {
    return await this.userService.createUser(data);
  }

  @Get()
  async userList(): Promise<User[]> {
    console.log('到这里');
    return await this.userService.userList();
  }

  @Get('/one')
  async findOne(@Param('id') id: string): Promise<User> {
    console.log('到这里', id);
    return await this.userService.findOne(id);
  }

  @Get('/res')
  async resList(): Promise<Res[]> {
    console.log('到这里');
    return await this.userService.resList();
  }
}
