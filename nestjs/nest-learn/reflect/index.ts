
import 'reflect-metadata';
interface Type<T> {
    new(...args: any[]): T;
}
class InjectionToken {
    constructor(public injectionIdentifier: string) { }
}
type Token<T> = Type<T> | InjectionToken;

const INJECT_METADATA_KEY = 'INJECT_KEY';

// 是一个参数装饰器工厂  会返回一个参数装饰器
function Inject(token: Token<any>) {
    /**
     * target 是Wife类本身
     * index 此参数在参数列表中的索引
     * Wife.index-1.INJECT_METADATA_KEY = type
     */
    return function (target: any, _propertyName: string | symbol, index: number) {
        // 定义了这个元数据之后有什么用?
        Reflect.defineMetadata(INJECT_METADATA_KEY, token, target, `index-${index}`);
        // 可以通过类的构造函数 获取类的第几个参数上的token是什么
        // Reflect.getMetadata(INJECT_METADATA_KEY,target,`index-${index}`s)
        return target;
    };
}

class Car { }

class LoggerService { }

class Wife {
    // 是构造函数 构造函数是属于类的 类似于静态函数
    constructor(
        private car: Car,
        @Inject(new InjectionToken('Logger')) private loggerService:LoggerService
    ) { }
}

console.log(Reflect.getMetadata(INJECT_METADATA_KEY,Wife,`index-1`))