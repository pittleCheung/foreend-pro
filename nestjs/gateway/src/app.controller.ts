import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  // constructor(private readonly appService: AppService) {}
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  // @Get()
  // @Version('1')
  // findAll() {
  //   return this.userService.findAll();
  // }
}
