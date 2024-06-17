# 创建项目

已经在本地全局安装了 nest
npm i -g @nestjs/cli
nest new project-name
这种创建项目的方法需要对 nest 版本进行升级，以便于创建的 nest 项目版本是最新的。
npm update @nestjs/cli -g

- 安装最新的 nest 脚手架
  pnpm install -g @nestjs/cli@latest

// 使用 npx 安装，会首先将 nest 下载下来，然后进行安装，这样每次拿到的都是最新的 nest 版本，但是总是会从远程下载
npx @nestjs/cli new projectName

# 使用 Fastify

注意 fastify 和 nest 版本应该一致
https://stackoverflow.com/questions/76561364/nest-js-nestjs-platform-fastify-nestfastifyapplicationrawserverdefault-does

```js
import { NestFactory } from "@nestjs/core"
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify"
import { ApplicationModule } from "./app.module"

async function bootstrap() {
  const app =
    (await NestFactory.create) <
    NestFastifyApplication >
    (ApplicationModule, new FastifyAdapter())
  await app.listen(3000)
}
bootstrap()
```

# 中间件

中间件（Middleware）是在路由处理程序之前执行的，它们可以拦截请求并对其进行处理。多个中间件可以按照定义的顺序依次执行。

守卫函数（Guards）是在路由处理程序之前执行的，它们用于对请求进行身份验证、授权等操作。多个守卫函数可以按照定义的顺序依次执行。

因此，中间件先于守卫函数执行。当请求到达时，首先会执行中间件，然后才会执行守卫函数，最后再进入路由处理程序。
