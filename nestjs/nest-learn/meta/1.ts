
import "reflect-metadata";


// demo1
// let target = {}

// Reflect.defineMetadata("name","pittle",target);


// Reflect.defineMetadata("name","world",target,"hello");


// console.log(Reflect.getOwnMetadata('name',target))


// console.log(Reflect.getOwnMetadata('name',target,'hello'))

// console.log(Reflect.getMetadata('name',target,'hello'))



// demo2
function classMetadata(key,value){
  return function(target){
    Reflect.defineMetadata(key,value,target)
  }
}

function methodMetadata(key,value){
  // target 类的原型
  return function(target,propertyName){
  // Person.prototype.hello.name = world
    Reflect.defineMetadata(key,value,target,propertyName)
  }
}

// decorator
// 给类本身增加元数据
@classMetadata("name","Person")  //相当于@Reflect.metadata("name","Person")
// @Reflect.metadata("name","Person")
class Person{
  // 给类的原型增加原数据
      //@Reflect.metadata("name","world")
      @methodMetadata("name","world") //相当于@Reflect.metadata("name","world")
      hello():string{return 'world'}
}

console.log(Reflect.getMetadata("name",Person));

console.log(Reflect.getMetadata("name",Person.prototype,"hello"))


