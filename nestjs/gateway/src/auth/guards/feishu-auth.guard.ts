// feishu-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FeishuAuthGuard extends AuthGuard('feishu') {}

/**
当使用 FeishuAuthGuard 守卫保护一个路由时，在请求到达时，框架会自动创建一个 FeishuAuthGuard 实例，并调用其 canActivate 方法进行判断是否允许访问该路由。以下是一个示例的 canActivate 方法的代码实现：

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FeishuAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 在这里编写身份验证逻辑

    const request = context.switchToHttp().getRequest();
    const isAuthenticated = this.feishuStrategy.validate(request);

    return isAuthenticated;
  }
}
在上述代码中，canActivate 方法接收一个 ExecutionContext 参数，该参数包含了当前请求的上下文信息。在方法内部，我们通过 context.switchToHttp().getRequest() 获取到当前的请求对象。

然后，调用与 FeishuAuthGuard 关联的 FeishuStrategy 的 validate 方法，并传入当前请求对象作为参数。这个方法执行具体的身份验证逻辑，并返回一个布尔值来表示验证结果。

最后，将验证结果作为 boolean 类型的返回值，告诉框架是否允许访问受保护的路由。如果返回 true，则允许访问；如果返回 false，则禁止访问。

请注意，以上只是一个示例的实现，具体的逻辑可能因你的应用程序而异。你需要根据你的具体需求，调用相应的验证策略，并根据验证结果返回正确的布尔值。
 */
