# 文档

https://docs.nestjs.cn/8/introduction

# nestjs 介绍

src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
文件名 文件描述
app.controller.ts 常见功能是用来处理 http 请求以及调用 service 层的处理方法
app.module.ts 根模块用于处理其他类的引用与共享。
app.service.ts 封装通用的业务逻辑、与数据层的交互（例如数据库）、其他额外的一些三方请求
main.ts 应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例。

命令 别名 描述
new n 搭建一个新的标准模式应用程序，包含所有需要运行的样板文件。
generate g 根据原理图生成或修改文件。

服务正常启动之后，接下来我们要开始写下第一个功能【用户模块】。

首先运行如下命令，CLI 会快速帮助我们自动生成一个用户的 UserController

$ nest g co user
不过此命令同时也会生成后缀为 spec 的测试文件，虽然有测试功能非常好，但在快速开发过程中，并非每一个功能都需要自动化测试覆盖，只要保证主要的功能有用例覆盖即可。
如果不需要每一次生成 spec 文件，可以在根目录下的 nest-cli.json 添加如下配置，禁用测试用例生成，后续再使用 CLI 创建 Controller 或者 Service 类型文件的时候，将不会继续生成：

```json
"generateOptions": {
  "spec": false
}
```

第一个 CURD
在小试牛刀之后，下面我们要开始借助 CLI 的能力快速生成 CURD 模块：

生成一个模块 (nest g mo) 来组织代码，使其保持清晰的界限（Module）。
生成一个控制器 (nest g co) 来定义 CRUD 路径（Controller）。
生成一个服务 (nest g s) 来表示/隔离业务逻辑（Service）。
生成一个实体类/接口来代表资源数据类型（Entity）。
可以看出一个最简单的 CURD 涉及的模块也会非常多（至少需要以上四个模块才能完成一个基础的 CURD 功能），并且要运行多个命令才能得到想要的结果，所幸 Nest CLI 已经集成了这样的功能来帮助我们减少重复的工作量：
$ nest g resource user

## class-validate

内置的验证装饰器非常多，下面只是简单的一些例子，更多的装饰器可以[翻阅文档](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypestack%2Fclass-validator 'https://github.com/typestack/class-validator')

| 装饰器                                | 描述                                                                                           |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **常见的验证装饰器**                  |                                                                                                |
| `@IsDefined(value: any)`              | 检查值是否已定义（!== undefined, !== null）。这是唯一忽略 skipMissingProperties 选项的装饰器。 |
| `@IsOptional()`                       | 检查给定值是否为空（=== null，=== undefined），如果是，则忽略该属性上的所有验证器。            |
| `@Equals(comparison: any)`            | 检查值是否等于 ("===") 比较。                                                                  |
| `@NotEquals(comparison: any)`         | 检查值是否不等于 ("!==") 比较。                                                                |
| `@IsEmpty()`                          | 检查给定值是否为空（=== ''、=== null、=== 未定义）。                                           |
| `@IsNotEmpty()`                       | 检查给定值是否不为空（！== ''，！== null，！== undefined）。                                   |
| `@IsIn(values: any[])`                | 检查值是否在允许值的数组中。                                                                   |
| `@IsNotIn(values: any[])`             | 检查 value 是否不在不允许的值数组中。                                                          |
| **类型验证装饰器**                    |                                                                                                |
| `@IsBoolean()`                        | 检查值是否为布尔值。                                                                           |
| `@IsDate()`                           | 检查值是否为日期。                                                                             |
| `@IsString()`                         | 检查字符串是否为字符串。                                                                       |
| `@IsNumber(options: IsNumberOptions)` | 检查值是否为数字。                                                                             |
| `@IsInt()`                            | 检查值是否为整数。                                                                             |
| `@IsArray()`                          | 检查值是否为数组                                                                               |
| `@IsEnum(entity: object)`             | 检查值是否是有效的枚举                                                                         |

## 依赖注入

imports: 用于导入其他的模块，从而能够在当前模块中使用这些模块提供的服务或者功能。

controllers: 用于定义控制器，控制器中包含了一些 REST API 的端点，用于接受和处理 HTTP 请求。

providers: 用于定义服务提供者，服务提供者可以是普通的类、函数等，也可以是基于依赖注入的服务工厂。

exports: 用于将当前模块的某些组件导出给其他模块使用，例如对外公开某些服务或者控制器等。

## 数据库

MongoDB 是无模式的，所以即使在配置参数开启了 synchronize，启动项目的时候也不会去数据库创建对应的表，所以不用奇怪，并没有出错，

但 Mysql 在每次应用程序启动时自动同步表结构，容易造成数据丢失，生产环境记得关闭，以免造成无可预计的损失。

## cache-manager

cache-manager 库基于 Node.js 中的 Cache 接口实现了缓存功能，可用于在 Node.js 应用程序中提供多种缓存后端支持。在应用程序中使用 cache-manager 库时，只需要先选择一个合适的缓存后端，并根据其特定的设置和配置创建一个缓存实例，然后就可以通过该实例来进行缓存操作，例如读取、写入、删除缓存等。

常见的缓存后端包括内存缓存、Redis 缓存、Memcached 缓存等。为了使用这些缓存后端，需要首先安装相应的缓存模块，例如 cache-manager-memory-store、cache-manager-redis-store、cache-manager-memcached-store 等。然后，在 Node.js 应用程序中，就可以通过以下方式来创建对应的缓存实例：

```js
const cacheManager = require('cache-manager');
const memoryCache = cacheManager.caching({
  store: 'memory',
  max: 100,
  ttl: 10,
});
// 创建一个 memory 缓存实例，最多可以缓存 100 条数据，每条数据的生存时间为 10 秒。
```

通过这样的方式，就可以实现基于不同的缓存后端来进行缓存操作。当应用程序需要读取缓存数据时，只需要调用缓存实例上的 get 方法，将要读取的键名作为参数传入即可。如果缓存中不存在该键名对应的值，则返回 null。

```js
const value = await memoryCache.get('key');
```

如果应用程序需要写入或更新缓存数据，则可以调用缓存实例上的 set 方法，并将要写入的键名、值和可选的过期时间 (ttl) 作为参数传入。

```js
await memoryCache.set('key', 'value', { ttl: 10 });
```

通过这样的方式，cache-manager 库就可以方便地实现缓存操作，并提供统一的 API，使得应用程序可以方便地切换不同的缓存后端。

## TS 基础

默认情况下，在 TS 开发的项目中是没办法导入 .json 后缀的模块，所以可以在 tsconfig.json 中新增 resolveJsonModule 配置即可。

```js
通常情况下，我们需要手动将 JSON 文件转换成一个 JavaScript 对象或数组，然后再在代码中使用导入的方式加载。例如，在使用 CommonJS 的语法时，我们可以通过 fs 模块中的 readFileSync 方法将 JSON 文件读取到内存中，并使用 JSON.parse 方法将其解析成 JavaScript 对象，示例代码如下：
const fs = require('fs');
const jsonString = fs.readFileSync('./data.json', 'utf-8');
const data = JSON.parse(jsonString);
console.log(data);

在 TypeScript 中，通过 import 或 require 语句导入 JSON 格式的数据时，需要先将 JSON 文件转换为 JavaScript 格式，然后再进行加载。为了简化这个过程，TypeScript 2.9 版本引入了新特性 resolveJsonModule，只需在 tsconfig.json 中将该配置选项设为 true，就可以直接导入 JSON 文件了。

下面是如何新增 resolveJsonModule 配置：

打开 tsconfig.json 文件。

在 compilerOptions 对象中添加一条新的属性 resolveJsonModule，并将它的值设为 true。例如：

json
{
  "compilerOptions": {
    // ...
    "resolveJsonModule": true
  },
  // ...
}
这样，在 TypeScript 代码中即可使用 import 或 require 语句导入 JSON 文件，无需手动将其转换为 JavaScript 格式，示例如下：

typescript
import data from './data.json';

console.log(data);
或者使用 CommonJS 风格的 require 语句：

typescript
const data = require('./data.json');

console.log(data);
需要注意的是，在使用 resolveJsonModule 配置的同时，还需要确保 esModuleInterop 配置选项也被启用，例如：

json
{
  "compilerOptions": {
    // ...
    "resolveJsonModule": true,
    "esModuleInterop": true
  },
  // ...
}
这是因为在默认情况下，TypeScript 将 JSON 文件解析为默认导出（default export）而不是命名导出（named exports），因此需要启用 esModuleInterop 配置选项以支持默认导出。
```
