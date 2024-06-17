"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseFactoryLoggerService = exports.UseValueLoggerServiceStringToken = exports.UseValueLoggerService = exports.UseClassLoggerService = void 0;
const common_1 = require("@nestjs/common");
let UseClassLoggerService = class UseClassLoggerService {
    constructor() {
        console.log("创建 UseClassLoggerService");
    }
    log(message) {
        console.log(message);
    }
};
UseClassLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UseClassLoggerService);
exports.UseClassLoggerService = UseClassLoggerService;
class UseValueLoggerService {
    log(message) {
        console.log(message);
    }
}
exports.UseValueLoggerService = UseValueLoggerService;
class UseValueLoggerServiceStringToken {
    log(message) {
        console.log(message);
    }
}
exports.UseValueLoggerServiceStringToken = UseValueLoggerServiceStringToken;
class UseFactoryLoggerService {
    log(message) {
        console.log(message);
    }
}
exports.UseFactoryLoggerService = UseFactoryLoggerService;
//# sourceMappingURL=logger.service.js.map