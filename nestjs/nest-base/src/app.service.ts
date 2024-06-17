import { Get, Injectable, UseGuards, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { SkipAuthGuard } from './guard/skip-auth/skip-auth.guard';

@Injectable()
export class AppService {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
  // @UseInterceptors(new LoggingInterceptor())
  @Get()
  // @UseGuards(SkipAuthGuard)
  getHello(): string {
    console.log('123123');
    return 'Hello World!';
  }
}
