import { Get, Controller,Inject } from "@nestjs/common";
import { AppService } from "./app.service";
import { UseClassLoggerService, UseValueLoggerService, UseFactoryLoggerService, UseValueLoggerServiceStringToken } from "./logger.service";
@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly useClassLoggerService: UseClassLoggerService,
    private readonly useValueLoggerService: UseValueLoggerService,
    @Inject("StringToken") private readonly useValueLoggerServiceStringToken: UseValueLoggerServiceStringToken,
    @Inject("FactoryToken")  private readonly useFactoryLoggerService: UseFactoryLoggerService
    ) { }
  @Get('/hello')
  hello() {
    this.useClassLoggerService.log('useClassLoggerService');
    this.useValueLoggerService.log('useValueLoggerService');
    this.useValueLoggerServiceStringToken.log('StringToken');
    this.useFactoryLoggerService.log('FactoryToken');
    return this.appService.getHello();
  }
}