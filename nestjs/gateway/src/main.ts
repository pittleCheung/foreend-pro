import { NestFactory } from '@nestjs/core';
import fastify from 'fastify';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  VERSION_NEUTRAL,
  VersioningType,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';

import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { FastifyLogger } from './common/logger';
import fastifyCookie from '@fastify/cookie';

import { generateDocument } from './doc';
declare const module: any;

const fastifyInstance = fastify({
  logger: FastifyLogger,
});

async function bootstrap() {
  // 使用NestFactory工厂创建一个app应用并且传递一个AppModule模块进去,类似我们使用express框架一样的先创建一个app
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // new FastifyAdapter(),
    // new FastifyAdapter({
    //   logger: true,
    // }),
    new FastifyAdapter(fastifyInstance),
  );

  // 接口版本化管理
  // 除了针对某一个请求添加版本之外，同样也可以添加全局以及整个 Controller 的版本，具体的版本配置规则可以根据自己的实际需求取舍。
  app.enableVersioning({
    // defaultVersion: '1',
    // defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常过滤器
  // 测试http异常：访问一个不存在的路径  http://localhost:12306/user
  // 原生的异常返回参数
  // {"statusCode":404,"message":"Cannot GET /user","error":"Not Found"}
  // 自定义的异常返回参数
  // {"statusCode":404,"timestamp":"2023-04-22T14:25:27.044Z","path":"/user","message":{"statusCode":404,"message":"Cannot GET /user","error":"Not Found"}}
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 启动全局字段校验，保证请求接口字段校验正确。
  app.useGlobalPipes(new ValidationPipe());

  //使用了 cookie 插件功能
  app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });

  // 热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // 创建文档
  generateDocument(app);

  // 监控端口,运行项目后浏览器直接访问localhost:3000
  await app.listen(12306);
}

bootstrap();
