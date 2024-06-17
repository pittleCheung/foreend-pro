import { APP_ID, APP_SECRET } from './const';

import { methodV } from 'src/utils/request';

export type GetAppTokenRes = {
  code: number;
  msg: string;
  app_access_token: string;
  expire: number;
};

// 添加新的换取用户凭证方法
export const getUserToken = async ({ code, app_token }) => {
  const { data } = await methodV({
    url: `/authen/v1/access_token`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${app_token}`,
    },
    params: {
      grant_type: 'authorization_code',
      code,
    },
  });
  return data;
};

export const refreshUserToken = async ({ refreshToken, app_token }) => {
  const { data } = await methodV({
    url: `/authen/v1/refresh_access_token`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${app_token}`,
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      app_token,
    },
  });
  return data;
};

// /suite/passport/oauth/token 则是飞书开放平台提供的接口之一，用于通过企业授权码（app_ticket）获取应用的永久授权令牌（permanent_code）和应用访问令牌（access_token）。该接口需要在应用授权时使用。
export const getUserAccessToken = async (code) => {
  const { data } = await methodV({
    url: `/suite/passport/oauth/token`,
    method: 'POST',
    params: {
      grant_type: 'authorization_code',
      code,
      app_id: APP_ID,
      app_secret: APP_SECRET,
    },
  });
  return data as GetAppTokenRes;
};

// /auth/v3/app_access_token/internal 是飞书开放平台提供的接口，用于获取飞书应用程序的 access_token，该 access_token 可以用于调用其他 API 接口，
export const getAppToken = async () => {
  const { data } = await methodV({
    url: `/auth/v3/app_access_token/internal`,
    method: 'POST',
    params: {
      app_id: APP_ID,
      app_secret: APP_SECRET,
    },
  });
  return data as GetAppTokenRes;
};
