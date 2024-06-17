// demo1
// import {Container} from './';
// let container = new Container();

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
import { Inject } from "./inject"
import { Container } from "./"
import { InjectionToken } from "./provider"
import { Injectable } from "./injectable"
let container = new Container()
@Injectable()
class Friend {
  constructor(public name: string) {}
}

@Injectable()
class Car {} //valueProviders

@Injectable()
class House {} // FactoryProvider

// debugger;
const hourseToken = new InjectionToken("Hourse")

// 用来区分不同的Friend
const beijingFriendToken = new InjectionToken("beijingFriendToken")
const guangzhouFriendToken = new InjectionToken("guangzhouFriendToken")
const shanghaiFriendToken = new InjectionToken("shanghaiFriendToken")

class GirlFriend {
  constructor(
    // private a,
    private car: Car,
    @Inject(hourseToken) private house: House,
    @Inject(beijingFriendToken) private beijingFriendToken: Friend,
    @Inject(guangzhouFriendToken) private guangzhouFriend: Friend,
    @Inject(shanghaiFriendToken) private shanghaiFriend: Friend,
  ) {}
}
// 注册Car
container.addProvider({ provide: Car, useValue: new Car() })
// 注册House
container.addProvider({ provide: hourseToken, useFactory: () => new House() })
// 注册GirlFriend
container.addProvider({ provide: GirlFriend, useClass: GirlFriend })

debugger

container.addProvider({
  provide: beijingFriendToken,
  useValue: new Friend("王建立"),
})
container.addProvider({
  provide: guangzhouFriendToken,
  useValue: new Friend("马化腾"),
})
container.addProvider({
  provide: shanghaiFriendToken,
  useValue: new Friend("pittle"),
})

let girlFriend = container.inject(GirlFriend)

console.log(girlFriend)
