// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class LogService {
//   log(str: string): void {
//     console.log(str);
//   }

//   error(str: string): void {
//     console.log(str);
//   }
// }

import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class LogService {
  constructor(
    @Inject('PREFIX') private readonly prefix: string, // 依赖注入的方式
  ) {}

  log(str: string): void {
    console.log(`${this.prefix}-${str}`);
  }
}
