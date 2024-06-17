"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFactoryProvider = exports.isValueProvider = exports.isClassProvider = exports.InjectionToken = void 0;
// 针对字符串类型的token 需要编写一个InjecttionToken
// 为什么不能直接用字符串当token 因为可以重名
class InjectionToken {
    constructor(injectionIdentifier) {
        this.injectionIdentifier = injectionIdentifier;
    }
}
exports.InjectionToken = InjectionToken;
// 自定义类型保护(拿到一个泛类型 推断子类型)
function isClassProvider(provider) {
    return provider.useClass != undefined;
}
exports.isClassProvider = isClassProvider;
function isValueProvider(provider) {
    return provider.useValue != undefined;
}
exports.isValueProvider = isValueProvider;
function isFactoryProvider(provider) {
    return provider.useFactory != undefined;
}
exports.isFactoryProvider = isFactoryProvider;
//# sourceMappingURL=provider.js.map