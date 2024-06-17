// 基本使用
// import { Module } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';

// @Module({
//   controllers: [UserController],
//   providers: [UserService],
// })
// export class UserModule {}

//  对接飞书
// import { CacheModule, forwardRef, Module } from '@nestjs/common';
// import { FeishuService } from './feishu/feishu.service';
// import { FeishuController } from './feishu/feishu.controller';
// // NestJS 提供了高速缓存的插件 cache-manager，为对各种缓存存储提供程序提供了统一的 API，内置的是内存中的数据存储。
// @Module({
//   // imports: [CacheModule.register()], // 在使用的 Module 中注册 CacheModule  在全局导入了,所以这里我就注销了
//   controllers: [FeishuController],
//   providers: [FeishuService],
// })
// export class UserModule {}

// 对接mongo数据库
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';
import { FeishuController } from './feishu/feishu.controller';
import { FeishuService } from './feishu/feishu.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FeishuController, UserController],
  providers: [...UserProviders, UserService, FeishuService],
  exports: [UserService],
})
export class UserModule {}
