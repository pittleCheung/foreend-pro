import {
  Controller,
  UseGuards,
  Res,
  Get,
  Query,
  VERSION_NEUTRAL,
} from '@nestjs/common';

import { FeishuAuthGuard } from './guards/feishu-auth.guard';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetTokenByApplications } from './auth.dto';
import { Public } from './constants';
import { PayloadUser } from 'src/helper';
import { FastifyReply } from 'fastify';

@ApiTags('用户认证')
@Controller({
  path: 'auth',
  version: [VERSION_NEUTRAL],
})
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 当请求到达需要进行身份验证的路由处理函数时，
   * FeishuAuthGuard 守卫会被触发，并使用 FeishuStrategy 策略进行身份验证。
   * 在 FeishuStrategy 中，validate 方法会在验证逻辑中被调用。
   *
   * 在 getFeishuTokenByApplications 方法中我们使用了 @UseGuards(FeishuAuthGuard) 与 @Public() 两个装饰器，分别是飞书应用授权拦截与开启接口白名单。
   * https://open.feishu.cn/open-apis/authen/v1/index?app_id=cli_xxxxxxd&redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Fauth
   * @param user
   * @param response
   * @param query
   * @returns
   */
  @ApiOperation({
    summary: '飞书 Auth2 授权登录',
    description:
      '通过 code 获取`access_token`https://open.feishu.cn/open-apis/authen/v1/index?app_id=cli_xxxxxx&redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Fauth',
  })
  @UseGuards(FeishuAuthGuard)
  @Public()
  @Get('/feishu/auth2')
  async getFeishuTokenByApplications(
    @PayloadUser() user: Payload,
    @Res({ passthrough: true }) response: FastifyReply,
    @Query() query: GetTokenByApplications,
  ) {
    console.log('user', user);
    const { access_token } = await this.authService.login(user);
    response.setCookie('jwt', access_token, {
      path: '/',
    });
    return access_token;
  }

  @ApiOperation({
    summary: '解析 token',
    description: '解析 token 信息',
  })
  @Get('/token/info')
  async getTokenInfo(@PayloadUser() user: Payload) {
    return user;
  }
}
