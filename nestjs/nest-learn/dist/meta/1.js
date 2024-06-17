"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// demo1
// let target = {}
// Reflect.defineMetadata("name","pittle",target);
// Reflect.defineMetadata("name","world",target,"hello");
// console.log(Reflect.getOwnMetadata('name',target))
// console.log(Reflect.getOwnMetadata('name',target,'hello'))
// console.log(Reflect.getMetadata('name',target,'hello'))
// demo2
function classMetadata(key, value) {
    return function (target) {
        Reflect.defineMetadata(key, value, target);
    };
}
function methodMetadata(key, value) {
    // target 类的原型
    return function (target, propertyName) {
        // Person.prototype.hello.name = world
        Reflect.defineMetadata(key, value, target, propertyName);
    };
}
// decorator
// 给类本身增加元数据
let Person = 
// @Reflect.metadata("name","Person")
class Person {
    // 给类的原型增加原数据
    //@Reflect.metadata("name","world")
    hello() { return 'world'; }
};
__decorate([
    methodMetadata("name", "world") //相当于@Reflect.metadata("name","world")
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], Person.prototype, "hello", null);
Person = __decorate([
    classMetadata("name", "Person") //相当于@Reflect.metadata("name","Person")
    // @Reflect.metadata("name","Person")
], Person);
console.log(Reflect.getMetadata("name", Person));
console.log(Reflect.getMetadata("name", Person.prototype, "hello"));
//# sourceMappingURL=1.js.map