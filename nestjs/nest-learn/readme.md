# Note

`类型“typeof Reflect”上不存在属性“defineMetadata”。`

这个错误通常发生在使用 TypeScript 编译带有装饰器的代码时。它指出在 Reflect 类型上使用 defineMetadata 属性时出现了问题。

这个问题通常是由于缺少 reflect-metadata 库引起的。 reflect-metadata 库是一个用于在 TypeScript 中使用装饰器的运行时库，它提供了 Reflect 对象的一些方法，包括 defineMetadata。

要解决此问题，请确保已经在项目中安装了 reflect-metadata 库并在代码中导入它。例如，您可以使用以下命令安装它：

pnpm i reflect-metadata -D

然后在代码的顶部导入它：

import "reflect-metadata";

# 元数据

Reflect.defineMetadata("name","pittle",target,"hello");

这行代码使用了 TypeScript 中的装饰器和 Reflect 对象中的 defineMetadata 方法来在类 target 的 hello 属性上定义一个名为 name 的元数据，值为 pittle。

Reflect.defineMetadata("name","pittle",target);

与之前的代码不同的是，这个代码中并没有指定属性或方法的名称，而是在类 target 上直接定义了一个元数据。这意味着，这个元数据将与整个类相关联，而不是与类的某个具体成员相关联。

```js
Reflect.defineMetadata("name", "pittle", target)

Reflect.defineMetadata("name", "world", target, "hello")

console.log(Reflect.getOwnMetadata("name", target))

console.log(Reflect.getOwnMetadata("name", target, "hello")) //getOwnMetadata找target自身的元数据

console.log(Reflect.getMetadata("name", target, "hello")) // getMetadata还可以找target原型链上的元数据
```

修饰类

```js
function classMetadata(key, value) {
  return function (target) {
    Reflect.defineMetadata(key, value, target)
  }
}

// decorator
// 给类本身增加元数据
// @classMetadata("name","Person")  //相当于@Reflect.metadata("name","Person")
@Reflect.metadata("name", "Person")
class Person {
  // 给类的原型增加原数据
  @Reflect.metadata("name", "world")
  hello(): string {
    return "world"
  }
}

console.log(Reflect.getMetadata("name", Person))

console.log(Reflect.getMetadata("name", Person.prototype, "hello"))

import "reflect-metadata"
```

# 问题一

AppController 是怎么知道注入哪些服务？
AppController 通过构造函数参数来声明需要注入的服务。在 Nest.js 中，我们可以使用类的构造函数参数来声明需要注入的服务，例如：
constructor(private readonly appService: AppService) {}
上述代码中，构造函数参数中的 private readonly appService: AppService 表示需要注入一个类型为 AppService 的实例，并将其赋值给 appService 这个类成员变量。
在示例代码中，我们可以看到 AppController 的构造函数参数中除了 private readonly appService: AppService 之外，还声明了其他的参数，这些参数分别使用了不同的装饰器来指定注入的方式和标识符。这些装饰器告诉 Nest.js 如何注入这些参数所需的服务实例或值。

```js
//假设有一个 LoggerService 类作为一个服务，它有一个 log 方法：
export class LoggerService {
  log(message: string) {
    console.log(message)
  }
}
// 然后在 AppController 中需要依赖于 LoggerService，并在 @Controller 装饰器中传入一个 providers 数组，将 LoggerService 注册为一个提供者：
@Controller({
  providers: [LoggerService],
})
export class AppController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get()
  getHello(): string {
    this.loggerService.log('Hello World');
    return 'Hello World';
  }
}
// 为了能够在 constructor 中使用 LoggerService，AppModule 中还需要将其注册为 providers，然后在 AppModule 中注入一个 NestModuleRef 实例，用于获取模块中的服务实例或值：
@Module({
  controllers: [AppController],
  providers: [
    {
      provide: 'NestModuleRef',
      useValue: new NestModuleRef(),
    },
    LoggerService,
  ],
})
export class AppModule {}
// 最后，在 NestModuleRef 类中通过 Reflect 对象的 getMetadata 方法获取到构造函数的参数类型，然后通过 get 方法获取相应的服务实例或值：
export class NestModuleRef {
  private readonly instanceMap = new Map<any, any>();

  get<T>(type: Type<T>): T {
    const dependencies = Reflect.getMetadata('design:paramtypes', type) || [];
    const parameters = dependencies.map((dependency) =>
      this.get(dependency),
    );
    if (!this.instanceMap.has(type)) {
      this.instanceMap.set(type, new type(...parameters));
    }
    return this.instanceMap.get(type);
  }
}
这样就可以通过类型去找到相应的服务实例或值了。当 LoggerService 的依赖变化时，只需要在 AppModule 中修改 providers 数组即可。
Nest.js 框架会自动地将 NestModuleRef 注入到 AppModule 中，您无需手动注入该实例。NestModuleRef 实例是框架内部使用的，用于管理模块之间的依赖关系和获取服务实例或值。在您编写的应用程序代码中，您可以通过依赖注入器直接获取所需的服务实例或值，无需手动使用 NestModuleRef。
```

## 装饰器

```js
/**
 * 类装饰器
 * @param constructor 类的构造函数
 */
function classDecorator(constructor: Function) {}
/**
 * 属性装饰器
 * @param target 静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param property  属性的名称
 */
function propertyDecorator(target: any, property: string) {}
/**
 * 方法装饰器
 * @param target 静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param property 方法的名称
 * @param descriptor 方法描述符
 */
function methodDecorator(
  target: any,
  property: string,
  descriptor: PropertyDescriptor,
) {}
/**
 * 参数装饰器
 * @param target 静态成员是类的构造函数,实例成员是类的原型对象
 * @param methodName 方法名
 * @param paramsIndex 参数在函数列表中的索引
 */
function paramDecorator(target: any, methodName: string, paramsIndex: number) {}
```

## `__metadata`

`__decorate`:执行装饰器的函数，被执行的装饰器分为四类，类装饰器、参数装饰器、方法装饰器，还有一类特殊的装饰器是 ts 编译选项 emitDecoratorMetadata 生成的装饰器，用来定义一些特殊元数据 design:paramtypes 等，这些特殊元数据可以获取编译之前的类型信息
参数类型元数据使用元数据键"design:type"
参数类型元数据使用元数据键"design:paramtypes"
返回值类型元数据使用元数据键"design:returntype"
`__metadata`: 类装饰器工厂，获取的装饰器会将指定键值对与类关联起来
`__param`: 参数装饰器工厂，根据参数下标、参数装饰器、获取最终的装饰器，并且将参数下标传递给装饰器

# params 装饰器的应用

编译成 js
tsc reflect/test.ts --experimentalDecorators --emitDecoratorMetadata --target es5

输出到具体的文件 需要指定 --module 目前可选的是(amd or systemjs)
tsc test.ts --experimentalDecorators --emitDecoratorMetadata --target es5 --module amd --outFile test-es5.js

也可以使用 babel 编译
npx babel typescript.ts -o ts.js //.babelrc 添加@babel/plugin-transform-typescript 插件编译 ts

// 可以使用两种方式
// 使用 tsc test.ts 输出 到 test.js
// 使用 tsc test.ts --experimentalDecorators --emitDecoratorMetadata --target -es5
// 从输出结果来看 es5 版本的多了\_\_metadata("design:paramtypes", [Car, Hourse]), 因为我加了--emitDecoratorMetadata 参数
// 这是因为--emitDecoratorMetadata 选项的作用。当你使用了--emitDecoratorMetadata 选项时，TypeScript 编译器会在输出的 JavaScript 代码中包含有关装饰器的元数据信息，这一行代码就是其中之一。这个元数据信息将会被用于在运行时进行装饰器的反射操作。
// 所以，\*\*metadata("design:paramtypes", [Car, Hourse])这行代码的出现是因为--emitDecoratorMetadata 选项的作用，它会生成装饰器相关的元数据信息，以便在运行时使用。

```ts
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

class House {}

class GirlFriend {
  // 是构造函数 构造函数是属于类的 类似于静态函数
  constructor(
    private car: Car,
    @Inject(new InjectionToken("Logger")) private loggerService: LoggerService,
  ) {}
}

console.log(Reflect.getMetadata(INJECT_METADATA_KEY, GirlFriend, `index-1`))
```

## 类上装饰器执行顺序

可以看出执行结果顺序 先原型 后类上静态属性 再然后构造函数 最后是类本身(classD)

```js
/**
 * 类原型上函数参数装饰器
 * @param target  类的原型 这里是Example.prototype
 * @param context 修饰的函数的名称 这里是sum
 * @param index   修饰的的函数参数位置索引  这里是第一个参数索引是0
 */
function plogD(target, propertyKey, index)

/**
 * 类原型上函数装饰器
 * @param target 类的原型 这里是Example.prototype
 * @param name  修饰的函数名称 这里是sum
 * @param descriptor 修饰的函数的描述符  这里是{value:[function sum],writable:true,enumrable:false,configurable}
 */
function pfunctionD(target, propertyKey, descriptor)

/**
 * 类属性装饰器
 * @param target 修饰的类 这里是[class Example]
 * @param context 修饰的属性名称 这里是age
 */
function slog(target, propertyKey)

/**
 * 类构造函数参数装饰器
 * @param target 修饰的类 这里是[class Example]
 * @param context 构造函数不属于任何实例方法或属性 所以这里是undefined
 * @param index   这里修饰的是第二个参数 所以这里索引是 1
 */

/**
 * 类函数属性参数装饰器
 * @param target
 * @param propertyKey  修饰的类 这里是[class Example]
 * @param index
 */
function slogP(target, propertyKey, index)

/**
 * 类构造函数参数装饰器
 * @param target 修饰的类 这里是[class Example]
 * @param context 构造函数不属于任何实例方法或属性 所以这里是undefined
 * @param index   这里修饰的是第二个参数 所以这里索引是 1
 */
function clog(target, propertyKey, index)

/**
 * 类装饰器
 * @param target 修饰的类 这里是[class Example]
 */
function classD(target)
```

## 调试 TS

解决这个问题的方法是在调试配置文件 launch.json 中设置 Node.js 的路径，即将 runtimeExecutable 属性设置为 Node.js 的可执行文件路径。假设你的 Node.js 可执行文件在 /usr/local/bin/node，那么你可以将 launch.json 中的调试配置修改为：

```js
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Node.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/index.js",
      "runtimeExecutable": "/usr/local/bin/node",
      "args": []
    }
  ]
}
// 调试index.spec.ts
// ➜  nest-learn where node
// /Users/pittle/.nvm/versions/node/v18.14.2/bin/node
// /usr/local/bin/node
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug ioc",
      "type": "node",
      "request": "launch",
      "runtimeArgs": ["-r", "ts-node/register"],
      "args": ["${workspaceFolder}/ioc/index.spec.ts"],  // or "args": ["./ioc/index.spec.ts"],
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "/Users/pittle/.nvm/versions/node/v18.14.2/bin/node"
    }
  ]
}

// "version": "0.2.0"
// 这个字段指定了调试配置文件的版本。在这种情况下，它指定了使用的调试配置文件格式的版本号。

// "configurations": []
// 这是一个数组，包含了所有的调试配置。你可以在这里定义不止一个调试配置，每个配置都是一个对象。

// "name": "Debug ioc"
// 这个字段指定了调试配置的名称，它将会显示在 Visual Studio Code 的调试面板上，以便你能够选择并启动特定的调试配置。

// "type": "node"
// 这个字段指定了调试器的类型。在这种情况下，它指定了使用 Node.js 调试器来调试你的代码。

// "request": "launch"
// 这个字段指定了调试器应该执行的操作。在这种情况下，它指定了启动调试会话。

// "runtimeArgs": ["-r", "ts-node/register"]
// 这个字段指定了在运行 Node.js 可执行文件时传递的额外参数。在这种情况下，它指定了使用了 ts-node/register 模块来在运行时注册 TypeScript 支持。

// "args": ["${workspaceFolder}/ioc/index.spec.ts"]
// 这个字段指定了传递给 Node.js 可执行文件的命令行参数。在这种情况下，它指定了要运行的主文件的路径。

// "cwd": "${workspaceFolder}"
// 这个字段指定了 Node.js 进程的当前工作目录。在这种情况下，它指定了将当前工作目录设置为 Visual Studio Code 中打开的工作区的根目录。

// "runtimeExecutable": "/Users/pittle/.nvm/versions/node/v18.14.2/bin/node"
// 这个字段指定了 Node.js 可执行文件的完整路径。在这种情况下，它指定了要使用的 Node.js 可执行文件的路径。
```

其中，关键是 runtimeArgs 参数，它会在启动 Node.js 进程时加上 -r ts-node/register 参数，这个参数可以让 Node.js 进程在启动时通过 ts-node 模块加载并解析 TypeScript 代码。
args 参数表示传给 Node.js 进程的命令行参数，${relativeFile} 表示当前打开的文件的相对路径。
这样 VS Code 在启动调试时就会使用指定的 Node.js 可执行文件了。注意要将 runtimeExecutable 设置为你自己的 Node.js 路径。

## issue

使用 tsc reflect/test.ts 报错

Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.

原因: vscode 没有读到当前的 tsconfig.json 配置的 experimentalDecorators 选项

> https://stackoverflow.com/questions/38271273/experimental-decorators-warning-in-typescript-compilation

直接写 tsc reflect/test.ts --experimentalDecorators
