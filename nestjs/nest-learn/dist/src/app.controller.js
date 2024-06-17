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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const logger_service_1 = require("./logger.service");
let AppController = class AppController {
    constructor(appService, useClassLoggerService, useValueLoggerService, useValueLoggerServiceStringToken, useFactoryLoggerService) {
        this.appService = appService;
        this.useClassLoggerService = useClassLoggerService;
        this.useValueLoggerService = useValueLoggerService;
        this.useValueLoggerServiceStringToken = useValueLoggerServiceStringToken;
        this.useFactoryLoggerService = useFactoryLoggerService;
    }
    hello() {
        this.useClassLoggerService.log('useClassLoggerService');
        this.useValueLoggerService.log('useValueLoggerService');
        this.useValueLoggerServiceStringToken.log('StringToken');
        this.useFactoryLoggerService.log('FactoryToken');
        return this.appService.getHello();
    }
};
__decorate([
    (0, common_1.Get)('/hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "hello", null);
AppController = __decorate([
    (0, common_1.Controller)('/'),
    __param(3, (0, common_1.Inject)("StringToken")),
    __param(4, (0, common_1.Inject)("FactoryToken")),
    __metadata("design:paramtypes", [app_service_1.AppService,
        logger_service_1.UseClassLoggerService,
        logger_service_1.UseValueLoggerService,
        logger_service_1.UseValueLoggerServiceStringToken,
        logger_service_1.UseFactoryLoggerService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map