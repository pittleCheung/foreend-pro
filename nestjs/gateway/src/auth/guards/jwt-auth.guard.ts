// jwt-auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';
import { IS_PUBLIC_KEY } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   *
   * @param context
   * 在 canActivate 方法中，它首先通过使用 Reflector 获取路由处理程序和类上的 IS_PUBLIC_KEY 元数据。
   * IS_PUBLIC_KEY 是一个用于标记是否公开访问的自定义元数据键。如果存在并且值为 true，则表示当前路由或控制器是公开的，无需进行身份验证。
   * 在这种情况下，canActivate 方法直接返回 true，允许请求通过。
   * @returns
   */
  canActivate(context: ExecutionContext) {
    const loginAuth = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log(
      'canActive',
      loginAuth,
      context.getHandler(),
      context.getClass(),
    );

    if (loginAuth) {
      return true;
    }

    // 如果 IS_PUBLIC_KEY 元数据不存在或者值为 false，则调用父类 AuthGuard 的 canActivate 方法，该方法会执行实际的 JWT 身份验证逻辑。
    // 在这个过程中，会调用 JwtStrategy 的 validate 方法。
    // 在源码auth.gurad.js中的passport.authenticate 可以调用到源码passport.startegy.js中的 PassportStrategy
    return super.canActivate(context);
  }

  // /Users/pittle/2021-foreend/foreend-pro/nestjs/gateway/node_modules/jsonwebtoken/verify.js:82:17
  // 在进行jwt 也就是 jwt.verify(token, secretOrKey, options, callback) 验证的时候会进入这个逻辑
  handleRequest(err, user, info) {
    // console.log(err, user, info);
    if (err || !user) {
      throw (
        err ||
        new BusinessException({
          code: BUSINESS_ERROR_CODE.TOKEN_INVALID,
          message: 'token 已失效',
        })
      );
    }
    return user;
  }
}
