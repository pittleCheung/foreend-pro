import "reflect-metadata"

const key = Symbol.for("descriptor")

export function descriptor(description: string) {
  // 这里修饰类和修饰属性使用同一个装饰器 Reflect.metadata会对其做处理
  return Reflect.metadata(key, description)
}


export function printObj(obj: any) {
  const proto = Object.getPrototypeOf(obj);
  const cons = proto.constructor;

  console.log(Reflect.hasMetadata(key, cons));

  // 输出类的名字
  // 因为修饰器 @descriptor 在 Article 类上定义时，它其实是被应用到了 Article.prototype.con 上。
  if (Reflect.hasMetadata(key, cons)) {
    console.log(Reflect.getMetadata(key, cons));
  } else {
    console.log(cons.name);
  }

  // 输出所有的属性描述和属性值
  for (const k in obj) {
    if (Reflect.hasMetadata(key, proto, k)) {
      console.log(`\t${Reflect.getMetadata(key, proto, k)}::${obj[k]}`);
    } else {
      console.log(`\t${k}:${obj[k]}`);
    }
  }
}


@descriptor("文章")
class Article {
  [x: string]: any
  @descriptor("标题")
  title: string

  @descriptor("内容")
  content: string

  @descriptor("日期")
  date: Date
}

const ar = new Article()
ar.title = "xxxx"
ar.content = "asdfasdfasdfasdfasdf"
ar.date = new Date()

printObj(ar)