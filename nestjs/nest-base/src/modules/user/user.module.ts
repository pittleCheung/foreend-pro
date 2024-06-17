// import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
// import { LogModule } from '../log/log.module';
// @Module({
//   // 引入LogModule
//   imports: [LogModule],
//   controllers: [UserController],
//   providers: [UserService],
// })
// export class UserModule {}
// //

import { Module } from '@nestjs/common';
import { LogModule } from '../log/log.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { SkipAuthGuard } from 'src/guard/skip-auth/skip-auth.guard';

@Module({
  providers: [
    UserService,
    // 守卫
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: SkipAuthGuard,
    // },
  ],
  imports: [
    // 将User实体添加到当前模块的依赖中，以便在当前模块中可以对User实体进行操作，例如增删改查等。
    // 这个方法会将User实体添加到当前模块的providers中，并将其作为TypeORM的Repository提供给其他组件进行调用。
    TypeOrmModule.forFeature([
      // 这步骤是不能少的
      User,
    ]),
    LogModule.register('user'),
  ],
  controllers: [UserController],
})
export class UserModule {}
