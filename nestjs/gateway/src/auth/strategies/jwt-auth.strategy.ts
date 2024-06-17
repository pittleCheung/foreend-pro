// jwt-auth.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

import { FastifyRequest } from 'fastify';

// JwtStrategy 则是使用 passport-jwt拓展的功能，对 cookie 做了拦截、解密等功能。
const cookieExtractor = function (req: FastifyRequest) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

/**
 * 
jwtFromRequest：该选项用于指定从请求中提取 JWT 令牌的方法。在你的示例中，使用了 cookieExtractor 函数从请求的 cookie 中获取 JWT 令牌。除了从 cookie 中提取，还可以选择从请求头、查询参数或身份验证头中提取令牌。
ignoreExpiration：JWT 令牌通常会包含一个过期时间（exp），用于限制其有效期。设置 ignoreExpiration 为 true 会忽略令牌的过期检查，允许即使令牌已过期，也能够继续解码和验证令牌。
secretOrKey：用于提供对称加密算法或非对称加密算法的密钥或公钥。在验证过程中，使用此密钥或公钥来解码 JWT 令牌，并验证签名是否有效。
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: jwtConstants.ignoreExpiration,
      secretOrKey: jwtConstants.secret,
    });
    // console.log('JwtStrategy');
  }

  async validate(payload: Payload): Promise<Payload> {
    // console.log('JwtStrategy validate');
    return { ...payload };
  }
}
