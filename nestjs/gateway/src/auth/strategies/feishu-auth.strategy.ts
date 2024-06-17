// feishu-auth.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-custom';
import { FastifyRequest } from 'fastify';

// FeishuStrategy 根据 passport 提供的方法，自定义了飞书的专属策略，调用 authService 中的 validateFeishuUser 方法，从飞书获取对应的用户信息。
/**
1. 请求到达需要进行身份验证的路由处理函数（例如 getFeishuTokenByApplications）。
2. @UseGuards(FeishuAuthGuard) 装饰器将触发 FeishuAuthGuard 守卫进行身份验证。
3. FeishuAuthGuard 守卫将使用 FeishuStrategy 策略进行身份验证。
4. 在 FeishuStrategy 中，validate 方法被调用，并传入请求对象（FastifyRequest）作为参数。
5. 在 validate 方法中，通过调用 authService 的 validateFeishuUser 方法对飞书授权用户进行验证。
6. 如果验证成功，validate 方法返回验证通过的用户信息。
7. 如果验证失败，可以抛出 UnauthorizedException 异常或其他适合情况的异常。
8. 如果验证通过，请求将继续访问路由处理函数，并且可以通过参数或者路由守卫的上下文中访问验证通过的用户信息。
 */
@Injectable()
export class FeishuStrategy extends PassportStrategy(Strategy, 'feishu') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: FastifyRequest): Promise<Payload> {
    const q: any = req.query;

    const user = await this.authService.validateFeishuUser(q.code as string);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

/**
 * clas B{}  class A extend B{ pittle(){} }   如何通过父类B 获取所有继承B的子类
 * 使用元数据（Metadata）：使用装饰器和元数据来注册子类到父类的元数据中，然后通过反射机制来获取这些元数据。以下是一个简单的示例：
 * 
  const subclasses: Function[] = [];

  function RegisterSubclass(target: Function) {
    subclasses.push(target);
  }

  class B {
    static getSubclasses() {
      return subclasses;
    }
  }

  @RegisterSubclass
  class A extends B {
    pittle() {
      console.log('Method pittle() in class A is called.');
    }
  }

  console.log(B.getSubclasses()); // 输出 [A]

 */

/**
 * 查看PassportStrategy的源码
 * 
在源码中，PassportStrategy 是一个返回混入类的工厂函数。这个工厂函数接受三个参数：Strategy、name 和 callbackArity。

当你创建 FeishuStrategy 类时，实际上是通过调用 PassportStrategy 工厂函数，并传入相应的参数来得到一个继承自传入的 Strategy 的混入类 MixinStrategy。在这个过程中，MixinStrategy 继承自 Strategy 并且包含了 PassportStrategy 内部定义的一些逻辑。

在 FeishuStrategy 类的构造函数中，你调用了 super() 方法，它会调用 MixinStrategy 的构造函数。由于 MixinStrategy 继承自 Strategy，所以 super() 实际上是调用了 Strategy 的构造函数。这样就将 FeishuStrategy 与 MixinStrategy 关联起来。

通过这样的继承和混入机制，FeishuStrategy 类间接地继承了 Strategy，并且包含了 PassportStrategy 中定义的逻辑。在 FeishuStrategy 中，你可以使用 this 来访问从 MixinStrategy 继承而来的属性和方法，同时也可以使用 this 访问 Strategy 原型链上的属性和方法。

因此，在 FeishuStrategy 类中的 validate 方法中，可以通过 this.authService 访问到 MixinStrategy 中定义的 authService 属性。这是因为 MixinStrategy 继承自 Strategy，而 Strategy 是通过 super() 进行初始化并且提供了 authService 属性。

总结起来，FeishuStrategy 在继承 MixinStrategy 的同时，间接地继承了 Strategy 的属性和方法，并且可以通过 this 来访问它们。
 */
