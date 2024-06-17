// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { ConfigOptions } from './config/interfaces';
import { CONFIG_OPTIONS } from './config/constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/a')
  getA(): string {
    return this.configService.get('HELLO_MESSAGE');
  }
}
