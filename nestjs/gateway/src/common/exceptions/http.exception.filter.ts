import { FastifyReply, FastifyRequest } from 'fastify';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BusinessException } from './business.exception';
import { error } from 'console';

// 处理 HTTP 类型的接口相关异常。
//http.exception.filter.ts => Catch 的参数为 HttpException 将只捕获 HTTP 相关的异常错误
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    // # 注意
    // 由于异常拦截的返回函数使用的是 Fastify 提供的，所以我们使用的返回方法是 .send（），
    // 如果你没有使用 Fastify 作为 HTTP 底层服务的话，拦截返回的方法要保持跟官网一致（官网默认的是 Express 的框架，所以返回方法不一样）。

    // 处理业务异常
    if (exception instanceof BusinessException) {
      const error = exception.getResponse();
      console.log(error);
      response.status(HttpStatus.OK).send({
        data: null,
        status: error['code'],
        extra: {},
        message: error['message'],
        success: false,
      });
      return;
    }

    console.log('http.exception', error['message']);

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse(),
    });
  }
}
