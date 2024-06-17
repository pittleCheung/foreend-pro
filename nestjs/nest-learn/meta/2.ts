//  #根据类型获取类
import "reflect-metadata";
class MyService {
  private readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
  public sayHello(): void {
    console.log(`Hello, ${this.name}!`);
  }
}

class MyClass {
  private readonly myService: MyService;
  constructor(myService: MyService) {
    this.myService = myService;
  }
  public sayHello(): void {
    this.myService.sayHello();
  }
}
// 定义元数据类型  将 MyClass 构造函数的参数类型元数据设置为 [MyService]
Reflect.defineMetadata('design:paramtypes', [MyService], MyClass.prototype, 'constructor');
const target = MyClass.prototype;
const key = 'constructor';
// 获取元数据类型
const token = Reflect.getMetadata('design:paramtypes', target, key);
console.log(token);

// demo2
// import "reflect-metadata";

// function ParameterTypes(target: any, key: string) {
//   const types = Reflect.getMetadata("design:paramtypes", target, key);
//   console.log(types);
// }

// class Example {
//   constructor(arg1: string, arg2: number) {}

//   @ParameterTypes
//   exampleMethod(arg1: string, arg2: number) {}
// }

// // 添加元数据
// Reflect.defineMetadata("design:paramtypes", [String, Number], Example.prototype, "exampleMethod");

// const example = new Example("hello", 42);
// example.exampleMethod("world", 123);



// demo3
// import "reflect-metadata";

// function ParameterTypes(target: any, key: string) {
//   const token = Reflect.getMetadata('design:paramtypes', target, key);
//   console.log(token);
// }

// class Test {
//   constructor(private a: string, private b: number) {}

//   @ParameterTypes
//   foo(c: boolean) {}
// }

// // 手动添加 Test 类构造函数参数类型的元数据
// Reflect.defineMetadata('design:paramtypes', [String, Number], Test);

// new Test('hello', 123).foo(true); // 打印出 [Boolean]
