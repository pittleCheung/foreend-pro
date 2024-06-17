import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 在配置版本的过程中，也不断地测试了很多次接口，不难发现返回的接口数据非常的不标准，
// 在一个正常的项目中不太合适用这种数据结构返回，毕竟这样对前端不友好，也不利于前端做统一的拦截与取值，所以需要格式化请求参数，输出统一的接口规范。

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        status: 0,
        extra: {},
        message: 'success',
        success: true,
      })),
    );
  }
}
