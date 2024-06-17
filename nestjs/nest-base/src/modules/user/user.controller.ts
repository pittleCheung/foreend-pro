import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Request,
  Response,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LogService } from '../log/log.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  /**
   * @Get([path])当前的path会拼接到@Controller('user')到里面user的路径后面，不写就表示为空的
   */
  // @Get()
  // // userList这个方法名随便自己定义,要见文思意就可以
  // async userList(@Query() query: any) {
  //   // 控制层访问服务层的userList方法
  //   // this.logService.log('运行了userList控制器');
  //   // 控制层访问服务层的userList方法
  //   return await this.userService.userList();
  // }

  // 只接收全部参数里面的其中一个或者多个,ParseIntPipe是nestjs中内置管道
  // @Get()
  // userList(
  //   @Query('age', new ParseIntPipe()) age: number,
  //   @Query('name') name: string,
  // ): string {
  //   // 我只要age和name字段,别的你传递多的给我，我也不接收也不处理
  //   console.log(age, name);
  //   return '用户列表';
  // }

  // _pk_id.423.1fff=d89c4829eb493279.1681384535.; _ttoclientid=95251734.1681384535; _ttoclid=942011537.1681384535
  // @Post()
  // addUser(@Body() body: any) {
  //   // 这种写法适合大规模的提交参数,自己又不想一个一个去校验
  //   console.log(body);
  //   return body;
  // }

  // @Get()
  // index(@Request() req) {
  //   console.log(req.cookies, '当前的cookie');
  //   return '主页';
  // }

  // @Get('login')
  // login(@Response() res) {
  //   // 如果使使用了res就不能使用return，必须使用send
  //   res.cookie('name', 'hello', { maxAge: 1000 * 500, httpOnly: true });
  //   res.send('登录页面');
  // }

  // @Get()
  // index(@Request() req) {
  //   console.log(req.signedCookies, '当前的cookie');
  //   return '主页';
  // }

  // @Get('login')
  // login(@Response() res) {
  //   // 如果使使用了res就不能使用return，必须使用send
  //   // res.cookie('name', 'hello', { maxAge: 1000 * 5, httpOnly: true });
  //   res.cookie('name', 'hello', {
  //     maxAge: 1000 * 500,
  //     httpOnly: true,
  //     signed: true,
  //   });
  //   res.send('登录页面');
  // }

  // session
  // @Get()
  // index(@Request() req: { [key: string]: any }): string {
  //   console.log(req.session);
  //   return '用户主页';
  // }

  // @Get('login')
  // login(
  //   @Response() res: { [key: string]: any },
  //   @Request() req: { [key: string]: any },
  // ): void {
  //   req.session.name = 'hello';
  //   // 再次提醒使用了@Response就不能使用return
  //   res.send('登录页面');
  // }

  // typeorm
  @Post()
  async createUser(@Body() data: { [propName: string]: any }): Promise<User> {
    return await this.userService.createUser(data);
  }

  @Get()
  async userList(): Promise<User[]> {
    return await this.userService.userList();
  }

  // @Get('find')
  // async find(): Promise<User[]> {
  //   return await this.userService.find();
  // }
}
