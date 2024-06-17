import { Injectable } from "@nestjs/common"

@Injectable()
export class UseClassLoggerService {
  constructor() {
    console.log("创建 UseClassLoggerService")
  }
  log(message: string) {
    console.log(message)
  }
}

export class UseValueLoggerService {
  log(message: string) {
    console.log(message)
  }
}

export class UseValueLoggerServiceStringToken {
  log(message: string) {
    console.log(message)
  }
}

export class UseFactoryLoggerService {
  log(message: string) {
    console.log(message)
  }
}
