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
exports.printObj = exports.descriptor = void 0;
require("reflect-metadata");
const key = Symbol.for("descriptor");
function descriptor(description) {
    // 这里修饰类和修饰属性使用同一个装饰器 Reflect.metadata会对其做处理
    return Reflect.metadata(key, description);
}
exports.descriptor = descriptor;
function printObj(obj) {
    const proto = Object.getPrototypeOf(obj);
    const cons = proto.constructor;
    console.log(Reflect.hasMetadata(key, cons));
    // 输出类的名字
    // 因为修饰器 @descriptor 在 Article 类上定义时，它其实是被应用到了 Article.prototype.con 上。
    if (Reflect.hasMetadata(key, cons)) {
        console.log(Reflect.getMetadata(key, cons));
    }
    else {
        console.log(cons.name);
    }
    // 输出所有的属性描述和属性值
    for (const k in obj) {
        if (Reflect.hasMetadata(key, proto, k)) {
            console.log(`\t${Reflect.getMetadata(key, proto, k)}::${obj[k]}`);
        }
        else {
            console.log(`\t${k}:${obj[k]}`);
        }
    }
}
exports.printObj = printObj;
let Article = class Article {
};
__decorate([
    descriptor("标题"),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    descriptor("内容"),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    descriptor("日期"),
    __metadata("design:type", Date)
], Article.prototype, "date", void 0);
Article = __decorate([
    descriptor("文章")
], Article);
const ar = new Article();
ar.title = "xxxx";
ar.content = "asdfasdfasdfasdfasdf";
ar.date = new Date();
printObj(ar);
//# sourceMappingURL=3.js.map