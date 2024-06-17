import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import {
  getAppToken,
  getUserAccessToken,
  getUserToken,
  refreshUserToken,
} from 'src/helper/feishu/auth';
import { Cache } from 'cache-manager';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';
import { messages } from '@/helper/feishu/message';
import { GetUserTokenDto } from './feishu.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';

@Injectable()
export class FeishuService {
  private APP_TOKEN_CACHE_KEY;
  private USER_TOKEN_CACHE_KEY;
  private USER_REFRESH_TOKEN_CACHE_KEY;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configService.get('APP_TOKEN_CACHE_KEY');
    this.USER_TOKEN_CACHE_KEY = this.configService.get('USER_TOKEN_CACHE_KEY');
    this.USER_REFRESH_TOKEN_CACHE_KEY = this.configService.get(
      'USER_REFRESH_TOKEN_CACHE_KEY',
    );
  }

  async getAppToken() {
    let appToken: string;
    appToken = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY);
    if (!appToken) {
      const response = await getAppToken();
      if (response.code === 0) {
        // token 有效期为 2 小时，在此期间调用该接口 token 不会改变。当 token 有效期小于 30 分的时候,再次请求获取 token 的时候，会生成一个新的 token，与此同时老的 token 依然有效。
        appToken = response.app_access_token;
        this.cacheManager.set(
          this.APP_TOKEN_CACHE_KEY,
          appToken,
          response.expire - 60,
        );
        // response.expire - 60 是一个计算过期时间的表达式，其中 response.expire 表示从 API 返回的令牌有效期 (expiration time)，单位为秒。在这个表达式中，我们将有效期减去了 60 秒 (1 分钟)，表示在实际使用令牌时，预留了一定的时间给后续处理，确保万无一失。
        // 具体来说，当使用 FeishuService 类的 getToken 方法获取到新的应用令牌时，会根据返回的令牌有效期计算出缓存数据的过期时间。而在这个过程中，我们会将有效期减去 60 秒，这样可以确保在实际使用令牌时，不会因为网络延迟等原因导致令牌过期而出错。
        // 例如，如果从 API 返回的令牌有效期为 1800 秒 (30 分钟)，那么经过减去 60 秒后，缓存数据的过期时间就是 1740 秒 (29 分钟)。这样做既能够保证令牌不会在使用时过期，又能够尽量提高缓存数据的利用率，提高应用程序的性能和响应速度。
        // this.cacheManager.set(this.APP_TOKEN_CACHE_KEY, appToken, {
        //   ttl: response.expire - 60,
        // });
      } else {
        throw new BusinessException('飞书调用异常');
      }
    }
    return appToken;
  }

  async sendMessage(receive_id_type, params) {
    const app_token = await this.getAppToken();
    return messages(receive_id_type, params, app_token as string);
  }

  // 添加新的换取用户凭证的 Service
  async getUserToken(code: string) {
    const app_token = await this.getAppToken();
    const dto: GetUserTokenDto = {
      code,
      app_token,
    };
    const res: any = await getUserToken(dto);
    if (res.code !== 0) {
      throw new BusinessException(res.msg);
    }
    return res.data;
  }

  async setUserCacheToken(tokenInfo: any) {
    const {
      refresh_token,
      access_token,
      user_id,
      expires_in,
      refresh_expires_in,
    } = tokenInfo;

    // 缓存用户的 token
    await this.cacheManager.set(
      `${this.USER_TOKEN_CACHE_KEY}_${user_id}`,
      access_token,
      expires_in - 60,
    );

    // 缓存用户的 fresh token
    await this.cacheManager.set(
      `${this.USER_REFRESH_TOKEN_CACHE_KEY}_${user_id}`,
      refresh_token,
      refresh_expires_in - 60,
    );
  }

  async getCachedUserToken(userId: string) {
    let userToken: string = await this.cacheManager.get(
      `${this.USER_TOKEN_CACHE_KEY}_${userId}`,
    );

    // 如果 token 失效
    if (!userToken) {
      const refreshToken: string = await this.cacheManager.get(
        `${this.USER_REFRESH_TOKEN_CACHE_KEY}_${userId}`,
      );
      if (!refreshToken) {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.TOKEN_INVALID,
          message: 'token 已失效',
        });
      }
      // 获取新的用户 token
      const usrTokenInfo = await this.getUserTokenByRefreshToken(refreshToken);
      // 更新缓存的用户 token
      await this.setUserCacheToken(usrTokenInfo);
      userToken = usrTokenInfo.access_token;
    }
    return userToken;
  }

  async getUserTokenByRefreshToken(refreshToken: string) {
    return await refreshUserToken({
      refreshToken,
      app_token: await this.getAppToken(),
    });
  }
}
