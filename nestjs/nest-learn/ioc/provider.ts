import { Type } from "./type";
// 针对字符串类型的token 需要编写一个InjecttionToken
// 为什么不能直接用字符串当token 因为可以重名
export class InjectionToken {
    constructor(public injectionIdentifier: string) { }
}
// 如果你又多个字符串类型的token的话InjectionToken如何区分?
// string Logger   new InjectionToken("Logger")
// string Find   new InjectionToken("Find")

//Token 类型是一个联合类型，既可以是一个函数类型也可以是 InjectionToken 类型
export type Token<T> = Type<T> | InjectionToken;

export interface BaseProvider<T> {
    provide: Token<T>;
}

export interface ClassProvider<T> extends BaseProvider<T> {
    // provide: Token<T>;
    useClass: Type<T>;
}

export interface ValueProvider<T> extends BaseProvider<T> {
    // provide: Token<T>;
    useValue: T;
}

export interface FactoryProvider<T> extends BaseProvider<T> {
    // provide: Token<T>;
    useFactory: () => T;
}

export type Provider<T> =
    | ClassProvider<T>
    | ValueProvider<T>
    | FactoryProvider<T>;   


// 自定义类型保护(拿到一个泛类型 推断子类型)
export function isClassProvider<T>(provider:BaseProvider<T>):provider is ClassProvider<T>{
  return (provider as any).useClass != undefined
}

export function isValueProvider<T>(provider:BaseProvider<T>):provider is ValueProvider<T>{
  return (provider as any).useValue != undefined
}

export function isFactoryProvider<T>(provider:BaseProvider<T>):provider is ClassProvider<T>{
  return (provider as any).useFactory != undefined
}