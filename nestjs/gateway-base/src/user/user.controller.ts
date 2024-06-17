import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';

// @Controller('user')
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getUser(): string {
    return 'hello user';
  }
  // 测试版本
  // @Get()
  // @Version('1')
  // getUser(): string {
  //   return 'hello user';
  // }

  // @Get()
  // @Version([VERSION_NEUTRAL, '1'])
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get()
  @Version('2')
  findAll2() {
    return 'i am new one';
  }

  // 伪造一个程序运行异常的接口，来验证常规异常是否能被正常捕获：
  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {};
    console.log(a.b.c);
    return this.userService.findAll();
  }

  // 重新伪造一个业务异常的场景
  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }
    return this.userService.findAll();
  }

  // 环境变量
  @Get('getTestName')
  getTestName() {
    console.log('test123123====');
    return this.configService.get('TEST_VALUE').name;
  }
}
