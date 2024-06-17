import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// @Injectable()
// export class SkipAuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }

@Injectable()
export class SkipAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isSkipAuth = this.reflector.get<boolean>(
      'isSkipAuth',
      context.getHandler(),
    );

    console.log(isSkipAuth);

    if (isSkipAuth) {
      return true;
    }

    // 鉴权逻辑
    // 如果需要鉴权，返回 false
    return false;
  }
}
