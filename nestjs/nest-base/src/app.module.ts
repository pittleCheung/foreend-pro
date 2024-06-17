import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LogModule } from './modules/log/log.module';
import getConfig from '../config/database.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging/logging.interceptor';
import path from 'path';

@Module({
  imports: [
    // 配置加载配置文件
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
    }),
    // mysql的连接
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService): Promise<any> => {
        return {
          type: config.get('type'),
          host: config.get('host'),
          port: config.get('port'),
          username: config.get('username'),
          password: config.get('password'),
          database: config.get('database'),
          synchronize: true, // 自动同步数据模型到数据表中
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          logging: config.get('logging'),
        };
      },
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'rootroot',
    //   database: 'typeorm',
    //   synchronize: true, // 自动同步数据模型到数据表中
    //   logging: false,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
