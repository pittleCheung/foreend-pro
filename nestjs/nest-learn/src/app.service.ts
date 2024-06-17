import { Injectable } from "@nestjs/common"
import { UseClassLoggerService } from "./logger.service"

// 一个类被Injectable 装饰了 才能注入别的服务(这里注入了useClassLoggerService)
@Injectable()
export class AppService {
  constructor(private readonly useClassLoggerService: UseClassLoggerService) {}
  getHello(): string {
    this.useClassLoggerService.log("getHello")
    return "Hello"
  }
}
