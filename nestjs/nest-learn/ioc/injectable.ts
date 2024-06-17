import "reflect-metadata"

const INJECTABLE_METADATA_KEY = Symbol("INJECTABLE_METADATA_KEY")

// 可注入的装饰器(加了一个校验 这里暂时没有实现)
// 只有被这个装饰器装饰的类 才可以被注入
// 类装饰器
export function Injectable(){
  return function (target:any){
     // key value target
     Reflect.defineMetadata(INJECTABLE_METADATA_KEY,true,target);
     return target
  }
}