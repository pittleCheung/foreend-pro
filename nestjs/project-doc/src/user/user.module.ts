import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user1.entity';
import { UserHttpModule } from './user-http.module';
import { Res } from './res.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Res])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
