import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 导包
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import { AuthGuard } from './guard/auth/auth.guard';
import { LoggingInterceptor } from './logging/logging.interceptor';

const test1MiddleWares = (/*可以往中间件中传递参数*/) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (req: Request, res: Response, next: any) => {
    console.log('test1中间件');
    next();
  };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(test1MiddleWares()); //先执行中间件 后执行守卫
  // app.useGlobalGuards(new AuthGuard()); // 全局守卫
  // app.useGlobalInterceptors(new LoggingInterceptor()); //全局拦截器
  // 使用
  dotenv.config(); // 加载 .env 文件
  console.log(process.env.SECRET);
  // app.use(cookieParser(process.env.SECRET));
  // 配置中间件使用session,加盐是123456(随便写的)
  app.use(session({ secret: '123456', cookie: { maxAge: 60000 } }));
  await app.listen(3000);
}
bootstrap();
