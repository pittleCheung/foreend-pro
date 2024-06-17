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
require("reflect-metadata");
class InjectionToken {
    constructor(injectionIdentifier) {
        this.injectionIdentifier = injectionIdentifier;
    }
}
const INJECT_METADATA_KEY = 'INJECT_KEY';
// 是一个参数装饰器工厂  会返回一个参数装饰器
function Inject(token) {
    /**
     * target 是Wife类本身
     * index 此参数在参数列表中的索引
     * Wife.index-1.INJECT_METADATA_KEY = type
     */
    return function (target, _propertyName, index) {
        // 定义了这个元数据之后有什么用?
        Reflect.defineMetadata(INJECT_METADATA_KEY, token, target, `index-${index}`);
        // 可以通过类的构造函数 获取类的第几个参数上的token是什么
        // Reflect.getMetadata(INJECT_METADATA_KEY,target,`index-${index}`s)
        return target;
    };
}
class Car {
}
class LoggerService {
}
let Wife = class Wife {
    // 是构造函数 构造函数是属于类的 类似于静态函数
    constructor(car, loggerService) {
        this.car = car;
        this.loggerService = loggerService;
    }
};
Wife = __decorate([
    __param(1, Inject(new InjectionToken('Logger'))),
    __metadata("design:paramtypes", [Car,
        LoggerService])
], Wife);
console.log(Reflect.getMetadata(INJECT_METADATA_KEY, Wife, `index-1`));
//# sourceMappingURL=index.js.map