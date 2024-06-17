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

```
第一个 CURD
在小试牛刀之后，下面我们要开始借助 CLI 的能力快速生成 CURD 模块：

生成一个模块 (nest g mo) 来组织代码，使其保持清晰的界限（Module）。
生成一个控制器 (nest g co) 来定义 CRUD 路径（Controller）。
生成一个服务 (nest g s) 来表示/隔离业务逻辑（Service）。
生成一个实体类/接口来代表资源数据类型（Entity）。
可以看出一个最简单的 CURD 涉及的模块也会非常多（至少需要以上四个模块才能完成一个基础的 CURD 功能），并且要运行多个命令才能得到想要的结果，所幸 Nest CLI 已经集成了这样的功能来帮助我们减少重复的工作量：

$ nest g resource user
```
