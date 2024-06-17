import "reflect-metadata"
interface Type<T> {
  new (...args: any[]): T
}
class InjectionToken {
  constructor(public injectionIdentifier: string) {}
}
type Token<T> = Type<T> | InjectionToken

const INJECT_METADATA_KEY = "INJECT_KEY"

// 是一个参数装饰器工厂  会返回一个参数装饰器
function Inject(token: Token<any>) {
  /**
   * target 是Wife类本身
   * index 此参数在参数列表中的索引
   * Wife.index-1.INJECT_METADATA_KEY = type
   */
  return function (target: any, _propertyName: string | symbol, index: number) {
    // 定义了这个元数据之后有什么用?
    Reflect.defineMetadata(INJECT_METADATA_KEY, token, target, `index-${index}`)
    // 可以通过类的构造函数 获取类的第几个参数上的token是什么
    // Reflect.getMetadata(INJECT_METADATA_KEY,target,`index-${index}`s)
    return target
  }
}

class Car {}

class Hourse {}

class GirlFriend {
  // 是构造函数 构造函数是属于类的 类似于静态函数
  constructor(
    private car: Car,
    @Inject(new InjectionToken("Hourse")) private hourse: Hourse,
  ) {}
}

console.log(Reflect.getMetadata(INJECT_METADATA_KEY, GirlFriend, `index-1`))

// 可以使用两种方式
// 使用 tsc test.ts 输出 到 test.js
// 使用 tsc test.ts --experimentalDecorators --emitDecoratorMetadata --target -es5输出 到了 test-es5.js中

// 从输出结果来看 es5版本的多了__metadata("design:paramtypes", [Car, Hourse]), 因为我加了--emitDecoratorMetadata参数
// 这是因为--emitDecoratorMetadata选项的作用。当你使用了--emitDecoratorMetadata选项时，TypeScript编译器会在输出的JavaScript代码中包含有关装饰器的元数据信息，这一行代码就是其中之一。这个元数据信息将会被用于在运行时进行装饰器的反射操作。
// 所以，__metadata("design:paramtypes", [Car, Hourse])这行代码的出现是因为--emitDecoratorMetadata选项的作用，它会生成装饰器相关的元数据信息，以便在运行时使用。
