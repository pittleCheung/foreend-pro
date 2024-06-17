import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import {
  UseClassLoggerService,
  UseValueLoggerService,
  UseValueLoggerServiceStringToken,
  UseFactoryLoggerService,
} from "./logger.service"

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: UseClassLoggerService,
      useClass: UseClassLoggerService,
    },
    {
      provide: UseValueLoggerService,
      useValue: new UseValueLoggerService(),
    },
    {
      provide: "StringToken",
      useValue: new UseValueLoggerServiceStringToken(),
    },
    {
      provide: "FactoryToken",
      useFactory: () => new UseFactoryLoggerService(),
    },
  ],
})
export class AppModule {}
