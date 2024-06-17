"use strict";
// demo1
// import {Container} from './';
// let container = new Container();
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
// class Car{} //valueProviders
// class House{} // FactoryProvider
// class GirlFriend{
//   constructor(private car:Car, private house:House){
//   }
// }
// // 注册Car
// container.addProvider({ provide: Car, useValue: new Car() });
// // 注册House
// container.addProvider({ provide: House, useFactory:() => new House()  });
// // 注册GirlFriend
// container.addProvider({ provide: GirlFriend, useClass: GirlFriend });
// //
// console.log(container.providers);
// demo2
// import {Container} from './';
// let container = new Container();
// const point = { x: 100,y:100 };
// class BasicClass { }
// 注册ClassProvider
// container.addProvider({ provide: BasicClass, useClass: BasicClass });
// 注册ValueProvider
// container.addProvider({ provide: BasicClass, useValue: point });
// 注册FactoryProvider
// container.addProvider({ provide: BasicClass, useFactory: () => point });
//
// console.log(container.providers);
// demo3
// import { Inject } from './inject';
// import {Container} from './';
// import { InjectionToken } from './provider';
// let container = new Container();
// class Car{} //valueProviders
// class House{} // FactoryProvider
// // debugger;
// const hourseToken = new InjectionToken("Hourse")
// class GirlFriend{
//   constructor(
//     // private a,
//     private car:Car,
//     @Inject(hourseToken) private house:House)
//   {
//   }
// }
// // 注册Car
// container.addProvider({ provide: Car, useValue: new Car() });
// // 注册House
// container.addProvider({ provide: hourseToken, useFactory:() => new House()  });
// // 注册GirlFriend
// container.addProvider({ provide: GirlFriend, useClass: GirlFriend });
// //
// let girlFriend = container.inject(GirlFriend)
// console.log(girlFriend)
// demo4
// 如果一个类型对应多个属性 就不能区分不同属性了
// import { Inject } from './inject';
// import {Container} from './';
// import { InjectionToken } from './provider';
// let container = new Container();
// class Friend{
//   constructor(public name:string){
//   }
// }
// class Car{} //valueProviders
// class House{} // FactoryProvider
// // debugger;
// const hourseToken = new InjectionToken("Hourse")
// class GirlFriend{
//   constructor(
//     // private a,
//     private car:Car,
//     @Inject(hourseToken) private house:House,
//     private beijingFriend:Friend,
//     private guangzhouFriend:Friend,
//     private shanghaiFriend:Friend
//     )
//   {
//   }
// }
// // 注册Car
// container.addProvider({ provide: Car, useValue: new Car() });
// // 注册House
// container.addProvider({ provide: hourseToken, useFactory:() => new House()  });
// // 注册GirlFriend
// container.addProvider({ provide: GirlFriend, useClass: GirlFriend });
// container.addProvider({ provide: Friend, useClass: Friend });
// let girlFriend = container.inject(GirlFriend)
// console.log(girlFriend)
// demo5
// 不同属性对应同一个类型 需要不同的token区分
// demo4
// 一个类型对应多个属性
// import { Inject } from './inject';
// import {Container} from './';
// import { InjectionToken } from './provider';
// let container = new Container();
// class Friend{
//   constructor(public name:string){}
// }
// class Car{} //valueProviders
// class House{} // FactoryProvider
// // debugger;
// const hourseToken = new InjectionToken("Hourse")
// // 用来区分不同的Friend
// const beijingFriendToken = new InjectionToken("beijingFriendToken")
// const guangzhouFriendToken = new InjectionToken("guangzhouFriendToken")
// const shanghaiFriendToken = new InjectionToken("shanghaiFriendToken")
// class GirlFriend{
//   constructor(
//     // private a,
//     private car:Car,
//     @Inject(hourseToken) private house:House,
//     @Inject(beijingFriendToken) private beijingFriendToken:Friend,
//     @Inject(guangzhouFriendToken)  private guangzhouFriend:Friend,
//     @Inject(shanghaiFriendToken) private shanghaiFriend:Friend
//     )
//   {
//   }
// }
// // 注册Car
// container.addProvider({ provide: Car, useValue: new Car() });
// // 注册House
// container.addProvider({ provide: hourseToken, useFactory:() => new House()  });
// // 注册GirlFriend
// container.addProvider({ provide: GirlFriend, useClass: GirlFriend });
// container.addProvider({ provide: beijingFriendToken, useValue: new Friend("王建立") });
// container.addProvider({ provide: guangzhouFriendToken, useValue: new Friend("马化腾") });
// container.addProvider({ provide: shanghaiFriendToken, useValue: new Friend("pittle") });
// let girlFriend = container.inject(GirlFriend)
// console.log(girlFriend)
// demo6
const inject_1 = require("./inject");
const _1 = require("./");
const provider_1 = require("./provider");
const injectable_1 = require("./injectable");
let container = new _1.Container();
let Friend = class Friend {
    constructor(name) {
        this.name = name;
    }
};
Friend = __decorate([
    (0, injectable_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], Friend);
let Car = class Car {
}; //valueProviders
Car = __decorate([
    (0, injectable_1.Injectable)()
], Car);
let House = class House {
}; // FactoryProvider
House = __decorate([
    (0, injectable_1.Injectable)()
], House);
// debugger;
const hourseToken = new provider_1.InjectionToken("Hourse");
// 用来区分不同的Friend
const beijingFriendToken = new provider_1.InjectionToken("beijingFriendToken");
const guangzhouFriendToken = new provider_1.InjectionToken("guangzhouFriendToken");
const shanghaiFriendToken = new provider_1.InjectionToken("shanghaiFriendToken");
let GirlFriend = class GirlFriend {
    constructor(
    // private a,
    car, house, beijingFriendToken, guangzhouFriend, shanghaiFriend) {
        this.car = car;
        this.house = house;
        this.beijingFriendToken = beijingFriendToken;
        this.guangzhouFriend = guangzhouFriend;
        this.shanghaiFriend = shanghaiFriend;
    }
};
GirlFriend = __decorate([
    __param(1, (0, inject_1.Inject)(hourseToken)),
    __param(2, (0, inject_1.Inject)(beijingFriendToken)),
    __param(3, (0, inject_1.Inject)(guangzhouFriendToken)),
    __param(4, (0, inject_1.Inject)(shanghaiFriendToken)),
    __metadata("design:paramtypes", [Car,
        House,
        Friend,
        Friend,
        Friend])
], GirlFriend);
// 注册Car
container.addProvider({ provide: Car, useValue: new Car() });
// 注册House
container.addProvider({ provide: hourseToken, useFactory: () => new House() });
// 注册GirlFriend
container.addProvider({ provide: GirlFriend, useClass: GirlFriend });
debugger;
container.addProvider({
    provide: beijingFriendToken,
    useValue: new Friend("王建立"),
});
container.addProvider({
    provide: guangzhouFriendToken,
    useValue: new Friend("马化腾"),
});
container.addProvider({
    provide: shanghaiFriendToken,
    useValue: new Friend("pittle"),
});
let girlFriend = container.inject(GirlFriend);
console.log(girlFriend);
//# sourceMappingURL=index.spec.js.map