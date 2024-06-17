import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';

// @nestjs/config 默认会从项目根目录载入并解析一个 .env 文件，
// 从 .env 文件和 process.env 合并环境变量键值对，并将结果存储到一个可以通过 ConfigService 访问的私有结构。
// forRoot() 方法注册了 ConfigService 提供者，后者提供了一个 get() 方法来读取这些解析/合并的配置变量。

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
  ], // 依赖外面的模块(可以是自己创建的比如userModule，或者是官方提供的比如typeorm, graphql,或者第三方的)
  controllers: [AppController], // 该模块所用到的控制器
  providers: [AppService], // 该模块的提供者
  exports: [], // 别的模块要使用该模块中的某几个方法，就要在这里对外暴漏
})
export class AppModule {}

// 在使用自定义 YAML 配置文件之前，先要修改 app.module.ts 中 ConfigModule 的配置项 ignoreEnvFile，禁用默认读取 .env 的规则：
