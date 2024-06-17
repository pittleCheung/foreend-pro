"use strict"
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d
    //test 这里测试的c都是小于3的
    // console.log(arguments, "===arguments", desc, d)

    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc)
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex)
    }
  }
exports.__esModule = true
require("reflect-metadata")
/**
 * 各种装饰器的使用
 */
/**
 * 类原型上函数参数装饰器
 * @param target  类的原型 这里是Example.prototype
 * @param context 修饰的函数的名称 这里是sum
 * @param index   修饰的的函数参数位置索引  这里是第一个参数索引是0
 */
function plog(target, propertyKey, index) {
  // target === Example.prototype     //true
  console.log("plog params decorator", target, propertyKey, index) // Example.prototype  sum  0
}
/**
 * 类原型上函数装饰器
 * @param target 类的原型 这里是Example.prototype
 * @param name  修饰的函数名称 这里是sum
 * @param descriptor 修饰的函数的描述符  这里是{value:[function sum],writable:true,enumrable:false,configurable}
 */
function functionD(target, propertyKey, descriptor) {
  // target === Example.prototype     //true
  console.log("functionD decorator", target, propertyKey, descriptor) // Example.prototype  sum  sum's_descriptor
}

/**
 * 类属性装饰器
 * @param target 修饰的类 这里是[class Example]
 * @param context 修饰的属性名称 这里是age
 */
function slog(target, propertyKey) {
  console.log("slog property decortator", target, propertyKey)
}

/**
 * 类构造函数参数装饰器
 * @param target 修饰的类 这里是[class Example]
 * @param context 构造函数不属于任何实例方法或属性 所以这里是undefined
 * @param index   这里修饰的是第二个参数 所以这里索引是 1
 */
function clog(target, propertyKey, index) {
  // 非方法装饰器的第二个参数 propertyKey（在构造函数中是 undefined，因为构造函数不属于任何实例方法或属性）
  console.log("clog contructor decorator params x", target, propertyKey, index)
}
/**
 * 注意：
 * 在 TypeScript 中，当装饰器被应用于构造函数的参数时，被装饰参数的属性名在构造函数中是 undefined，是因为构造函数的参数并不是类的属性，而是构造函数的输入参数。
 * 在类的构造函数中，参数本身并没有与类的属性直接对应的关系，因此在这种情况下被装饰参数的属性名会被设为 undefined。
 * 换句话说，构造函数的参数是用来初始化类实例的，它们并不是类的属性。因此，在装饰器中被装饰参数的属性名为 undefined 是符合设计逻辑的。
 */
/**
 *  补充 类构造函数参数装饰器 可以套一层 通过闭包通过传递参数的名称
 * @param paramName
 * @returns
 */
function clog2(paramName) {
  return function (target, propertyKey, index) {
    console.log("clog2 Logging ".concat(paramName, " at index ").concat(index))
  }
}

function clog1(target, propertyKey, index) {
  console.log("clog1 pittle", target, propertyKey, index)
}

/**
 * 类装饰器
 * @param target 修饰的类 这里是[class Example]
 */
function classD(target) {
  //target ==== [class Example]  // true
  console.log("class decorator", target)
}

var Example = /** @class */ (function () {
  function Example(a, x, y, c) {
    this.a = a
    this.x = x
    this.y = y
    this.c = c
  }
  Example.prototype.sum = function (a, b) {
    return a + b
  }
  __decorate([functionD, __param(0, plog)], Example.prototype, "sum")
  __decorate([slog], Example, "age")
  Example = __decorate(
    [classD, __param(1, clog), __param(2, clog1), __param(3, clog2("c"))],
    Example,
  )
  return Example
})()
// 执行结果
// plog params decorator {} sum 0
// functionD decorator {} sum {
//   value: [Function: sum],
//   writable: true,
//   enumerable: false,
//   configurable: true
// }
// slog property decortator [class Example] age
// clog2 Logging c at index 3
// clog1 pittle [class Example] undefined 2
// clog contructor decorator params x [class Example] undefined 1   // pittle是参数y所在函数  说明参数装饰器也是从后向前执行
// class decorator [class Example]
// 可以看出执行结果顺序 先原型 后类上静态属性 再然后构造函数 最后是类本身(classD)
