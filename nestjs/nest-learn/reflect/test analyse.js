"use strict"
/**
 * 装饰器执行器
 * @param {*} decorators 装饰器数组
 * @param {*} target 装饰器目标
 * @param {*} key 元数据键
 * @param {*} desc 方法的描述符
 */
// 获取参数长度，当参数长度小于3, 说明目标就是target，否则目标为方法描述符
// 描述符不存在时，通过key从target获取，即认为key是方法名
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    /**
     * 注意 要倒序调用装饰器(这里先调用__metadata后调用__param)
     * 如果长度小于3  说明是类装饰器 直接调用类装饰器就可以了
     * 如果长度等于3 说明是类装饰器 并且有key 要把target 和 key穿给装饰器
     * 如果长度大于3 说明是方法装饰器 类,key,desc 传给装饰器
     */
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc)
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }

/**
 * 返回一个类装饰器
 */
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      // return Reflect.metadata(k, v);
      // Reflect.metadata相当于
      return function (target) {
        console.log("__metadata")
        Reflect.defineMetadata(k, v, target)
      }
  }
// 参数装饰器工厂
/**
 * paramIndex 这个参数在参数列表中的索引
 * decorator  参数装饰器
 */
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    //key在这里没有值key=_propertyName 是undefined
    return function (target, key) {
      // 所以这里是一个一个类装饰器 target=GirlFriend paramIndex=1
      console.log("__param")
      decorator(target, key, paramIndex) // 在类装饰器调用了参数装饰器
    }
  }
Object.defineProperty(exports, "__esModule", { value: true })
require("reflect-metadata")
var InjectionToken = /** @class */ (function () {
  function InjectionToken(injectionIdentifier) {
    this.injectionIdentifier = injectionIdentifier
  }
  return InjectionToken
})()
var INJECT_METADATA_KEY = "INJECT_KEY"
// 是一个参数装饰器工厂  会返回一个参数装饰器
function Inject(token) {
  /**
   * target 是Wife类本身
   * index 此参数在参数列表中的索引
   * Wife.index-1.INJECT_METADATA_KEY = type
   */
  return function (target, _propertyName, index) {
    // 定义了这个元数据之后有什么用?
    Reflect.defineMetadata(
      INJECT_METADATA_KEY,
      token,
      target,
      "index-".concat(index),
    )
    // 可以通过类的构造函数 获取类的第几个参数上的token是什么
    // Reflect.getMetadata(INJECT_METADATA_KEY,target,`index-${index}`s)
    return target
  }
}
var Car = /** @class */ (function () {
  function Car() {}
  return Car
})()
var Hourse = /** @class */ (function () {
  function Hourse() {}
  return Hourse
})()
var GirlFriend = /** @class */ (function () {
  // 是构造函数 构造函数是属于类的 类似于静态函数
  function GirlFriend(car, hourse) {
    this.car = car
    this.hourse = hourse
  }
  // 执行装饰器 从右往前装饰
  GirlFriend = __decorate(
    [
      __param(1, Inject(new InjectionToken("Hourse"))),
      __metadata("design:paramtypes", [Car, Hourse]),
    ],
    GirlFriend,
  )
  return GirlFriend
})()
console.log(Reflect.getMetadata(INJECT_METADATA_KEY, GirlFriend, "index-1"))
