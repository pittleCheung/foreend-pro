```js
import { Observable } from "rxjs"

// 流的创建
const stream$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next([1, 2, 3])
  }, 500)
})

// 如何消费流产生的数据，observer
const observer = {
  complete: () => console.log("done"),
  next: (v) => console.log(v),
  error: () => console.log("error"),
}

// 启动流
const subscription = stream$.subscribe(observer)

setTimeout(() => {
  // 停止流
  subscription.unsubscribe()
}, 1000)
```
