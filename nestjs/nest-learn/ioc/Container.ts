import { getInjectToken } from "./inject"
import {
  FactoryProvider,
  ClassProvider,
  Provider,
  Token,
  ValueProvider,
  isClassProvider,
  isFactoryProvider,
  isValueProvider,
  InjectionToken,
} from "./provider"
import { Type } from "./type"
import "reflect-metadata"
const DESIGN_PARAMTYPES = "design:paramtypes"

export class Container {
  public providers = new Map<Token<any>, Provider<any>>()
  // 注册提供者
  addProvider<T>(provider: Provider<T>) {
    // provide就是token或者说标识符
    this.providers.set(provider.provide, provider)
  }
  // 获取对应的服务
  inject(type: Token<any>) {
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

    let provider = this.providers.get(type)
    return this.injectWithProvider(type, provider)
  }

  injectWithProvider<T>(type: Token<T>, provider: Provider<T>) {
    console.log(type, "=====>", provider)
    if (provider === undefined) {
      throw new Error(`No provider for type ${this.getTokenName(type)}`)
    }
    if (isClassProvider(provider)) {
      return this.injectClass(provider as ClassProvider<T>)
    } else if (isValueProvider(provider)) {
      return this.injectValue(provider as ValueProvider<T>)
    } else if (isFactoryProvider(provider)) {
      return this.injectFactory(provider as FactoryProvider<T>)
    } else {
      throw Error(`provider ${type} is not support`)
    }
  }

  injectClass<T>(provide: ClassProvider<T>): T {
    // return new provide.useClass()    // 创建类的实例
    const target = provide.useClass
    // let params = [];
    let params = this.getInjectedParams(target) // target = GirlFriend
    console.log(params, "params") //[ Car {}, [Function: useFactory] ]
    return Reflect.construct(target, params) //通过反射创建类实例 相当于new provide.useClass(params)
  }

  // 从类上获取注入的参数
  getInjectedParams(target: Type<any>) {
    // const argTypes = Reflect.getMetadata(DESIGN_PARAMTYPES,target) as (undefined|Type<any>)
    // <Array<Type<any>>>表示任意的类的数组
    const argTypes = <Array<Type<any>> | undefined>(
      Reflect.getMetadata(DESIGN_PARAMTYPES, target)
    )
    // ts加上 --experimentalDecorators参数编译后的js会带__metadata("design:paramtypes", [Number, Number]),design:paramtypes 这个名称是固定的
    // 通过这个可以获取到当前类的构造函数参数的列表
    // console.log(argTypes) // [ [class Car], [class House] ]
    if (argTypes === undefined) {
      return []
    } else {
      // 把数组做一个转换 从type数组转化为此type对应的提供者的实例
      return argTypes.map((argType, index) => {
        const overrideToken = getInjectToken(target, index)
        // console.log(overrideToken,'xxx')
        const actualToken =
          overrideToken === undefined ? argType : overrideToken //actualToken = InjectionToken { injectionIdentifier: 'Hourse' }
        const provider = this.providers.get(actualToken) // provider = { provide: hourseToken, useFactory:() => new House()  }
        return this.injectWithProvider(actualToken, provider)
      })
    }
  }

  getTokenName(type: Token<any>) {
    //type是一个类
    return type instanceof InjectionToken ? type.injectionIdentifier : type.name
  }

  injectFactory<T>(provider: FactoryProvider<T>): () => T {
    return provider.useFactory
  }

  injectValue<T>(provider: ValueProvider<T>): T {
    return provider.useValue
  }
}
