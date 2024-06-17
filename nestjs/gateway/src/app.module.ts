import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
import { redisStore } from 'cache-manager-redis-store';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PageModule } from './materials/page/page.module';
import { UserModule } from './user/user.module';
// import { UserModule } from './userCenter/user/user.module';
import { SystemModule } from './userCenter/system/system.module';
import { UserRoleModule } from './userCenter/user-role/user-role.module';
import { RoleModule } from './userCenter/role/role.module';
import { ResourceModule } from './userCenter/resource/resource.module';
import { RolePrivilegeModule } from './userCenter/role-privilege/role-privilege.module';
import { PrivilegeModule } from './userCenter/privilege/privilege.module';
// import * as redisStore from 'cache-manager-redis-store';

// @nestjs/config 默认会从项目根目录载入并解析一个 .env 文件，
// 从 .env 文件和 process.env 合并环境变量键值对，并将结果存储到一个可以通过 ConfigService 访问的私有结构。
// forRoot() 方法注册了 ConfigService 提供者，后者提供了一个 get() 方法来读取这些解析/合并的配置变量。

// ConfigModule.forRoot() 是 NestJS 提供的一个用于加载应用程序配置信息的模块。

// 如果在 ConfigModule 中设置了 isGlobal: true，那么其他模块可以通过 @Inject() 装饰器来注入 ConfigService 服务，
// 从而获取应用程序的配置信息。具体来说，可以在其他模块的构造函数中声明一个 private configService: ConfigService 参数，
// 并使用 @Inject() 装饰器将其注入进来，然后就可以使用 configService 来访问应用程序的配置信息了。
@Module({
  imports: [
    //如果需要在其他地方也使用缓存，但又不想每次都引入 CacheModule，也可以在 app.module.ts 中引入，跟 ConfigModule 开启全局配置即可：
    CacheModule.register({
      isGlobal: true,
      store: redisStore as any,
      host: getConfig('REDIS_CONFIG').host,
      port: getConfig('REDIS_CONFIG').port,
      auth_pass: getConfig('REDIS_CONFIG').auth,
      db: getConfig('REDIS_CONFIG').db,
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true, // 禁用默认读取 .env 的规则
      isGlobal: true, //是否将该模块定义为全局模块。如果设置为 true，则该模块提供的服务可以被任何模块使用。
      load: [getConfig], //配置信息的加载器。它是一个函数数组，每个函数返回一个对象，包含应用程序所需的配置信息。
    }),
    UserModule,

    // AuthModule,

    // RBAC权限设计
    // PrivilegeModule,
    // ResourceModule,
    // RoleModule,
    // RolePrivilegeModule,
    // SystemModule,
    // UserModule,
    // UserRoleModule,

    // 物料系统
    // PageModule,
  ], // 依赖外面的模块(可以是自己创建的比如userModule，或者是官方提供的比如typeorm, graphql,或者第三方的)
  controllers: [AppController], // 该模块所用到的控制器
  // providers: [AppService], // 该模块的提供者
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAuthGuard,
  //   },
  // ],
  exports: [], // 别的模块要使用该模块中的某几个方法，就要在这里对外暴漏
})
export class AppModule {}

// 在使用自定义 YAML 配置文件之前，先要修改 app.module.ts 中 ConfigModule 的配置项 ignoreEnvFile，禁用默认读取 .env 的规则：
