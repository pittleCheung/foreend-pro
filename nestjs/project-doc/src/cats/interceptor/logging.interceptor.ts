import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
  intercept 是 Nest.js 中的一个方法，用于创建拦截器（Interceptor）。拦截器是一种中间件，它可以在请求到达处理程序之前或之后对请求进行干预和处理。
  具体来说，intercept 方法是 NestInterceptor 接口的一个成员方法。该接口允许你定义一个拦截器类，并实现 intercept 方法，用于处理请求并返回修改后的结果。
  拦截器可以用于以下情况：
  在请求到达处理程序之前，对请求进行预处理，例如验证、身份验证、日志记录等。
  在处理程序执行完成后对响应进行处理，例如修改响应数据、添加响应头等。
  在你提供的代码中，LoggingInterceptor 是一个拦截器类。通过实现 NestInterceptor 接口并定义 intercept 方法，你可以在请求到达处理程序之前（pre-processing）和之后（post-processing）执行一些自定义操作。
  在 intercept 方法中，你可以访问原始请求上下文和下一个处理程序。ExecutionContext 参数提供了有关当前请求的上下文信息，例如路由、请求对象等。CallHandler 参数代表着正在处理请求的下一个处理程序。
  在你的代码示例中，intercept 方法打印了一个日志信息，用于标识请求处理前后的时间差。通过调用 next.handle() 方法获取到的Observable可以继续传递给下一个拦截器或处理程序。
  总之，intercept 方法允许你定义拦截器的行为，并在请求到达和离开处理程序时执行自定义操作。这使得你可以轻松地实现通用的功能，如日志记录、异常处理、性能监控等。
 */

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
