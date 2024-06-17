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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// 参数装饰器
function log(parameter, context, index) {
    console.log(`Logging ${parameter} at index ${index}`);
}
function classD(target) {
    console.log("classD");
}
let Example = class Example {
    sum(a, b) {
        return a + b;
    }
};
__decorate([
    __param(0, log),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], Example.prototype, "sum", null);
Example = __decorate([
    classD
], Example);
// ts-node params.ts 结果如下
var example = new Example();
var FuncTypes = Reflect.getMetadata("design:type", example, "sum");
var paramTypes = Reflect.getMetadata("design:paramtypes", example, "sum");
var returnTypes = Reflect.getMetadata("design:returntype", example, "sum");
console.log("paramTypes=>", paramTypes, "FuncTypes=>", FuncTypes, "returnTypes=>", returnTypes); // 这里将会输出 sum 方法的参数类型信息
//# sourceMappingURL=params.js.map