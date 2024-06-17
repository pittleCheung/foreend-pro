"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const inject_1 = require("./inject");
const provider_1 = require("./provider");
require("reflect-metadata");
const DESIGN_PARAMTYPES = "design:paramtypes";
class Container {
    constructor() {
        this.providers = new Map();
    }
    // 注册提供者
    addProvider(provider) {
        // provide就是token或者说标识符
        this.providers.set(provider.provide, provider);
    }
    // 获取对应的服务
    inject(type) {
        //  let provider:ValueProvider<T> = <ValueProvider<T>>this.providers.get(token);
        //  return provider.useValue
        // let provider = this.providers.get(token);
        // if('useValue' in provider){
        //   return provider.useValue;
        // }else if('useClass' in provider){
        //   return new provider.useClass()
        // }else if("useFactory" in provider){
        //   return provider.useFactory()
        // }
        let provider = this.providers.get(type);
        return this.injectWithProvider(type, provider);
    }
    injectWithProvider(type, provider) {
        console.log(type, "=====>", provider);
        if (provider === undefined) {
            throw new Error(`No provider for type ${this.getTokenName(type)}`);
        }
        if ((0, provider_1.isClassProvider)(provider)) {
            return this.injectClass(provider);
        }
        else if ((0, provider_1.isValueProvider)(provider)) {
            return this.injectValue(provider);
        }
        else if ((0, provider_1.isFactoryProvider)(provider)) {
            return this.injectFactory(provider);
        }
        else {
            throw Error(`provider ${type} is not support`);
        }
    }
    injectClass(provide) {
        // return new provide.useClass()    // 创建类的实例
        const target = provide.useClass;
        // let params = [];
        let params = this.getInjectedParams(target); // target = GirlFriend
        console.log(params, "params"); //[ Car {}, [Function: useFactory] ]
        return Reflect.construct(target, params); //通过反射创建类实例 相当于new provide.useClass(params)
    }
    // 从类上获取注入的参数
    getInjectedParams(target) {
        // const argTypes = Reflect.getMetadata(DESIGN_PARAMTYPES,target) as (undefined|Type<any>)
        // <Array<Type<any>>>表示任意的类的数组
        const argTypes = (Reflect.getMetadata(DESIGN_PARAMTYPES, target));
        // ts加上 --experimentalDecorators参数编译后的js会带__metadata("design:paramtypes", [Number, Number]),design:paramtypes 这个名称是固定的
        // 通过这个可以获取到当前类的构造函数参数的列表
        // console.log(argTypes) // [ [class Car], [class House] ]
        if (argTypes === undefined) {
            return [];
        }
        else {
            // 把数组做一个转换 从type数组转化为此type对应的提供者的实例
            return argTypes.map((argType, index) => {
                const overrideToken = (0, inject_1.getInjectToken)(target, index);
                // console.log(overrideToken,'xxx')
                const actualToken = overrideToken === undefined ? argType : overrideToken; //actualToken = InjectionToken { injectionIdentifier: 'Hourse' }
                const provider = this.providers.get(actualToken); // provider = { provide: hourseToken, useFactory:() => new House()  }
                return this.injectWithProvider(actualToken, provider);
            });
        }
    }
    getTokenName(type) {
        //type是一个类
        return type instanceof provider_1.InjectionToken ? type.injectionIdentifier : type.name;
    }
    injectFactory(provider) {
        return provider.useFactory;
    }
    injectValue(provider) {
        return provider.useValue;
    }
}
exports.Container = Container;
//# sourceMappingURL=Container.js.map