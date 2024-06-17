# 确定目标

函数运行过程中用到的标记数据 建立对应关系

```js
var data1 = true,
  data2,
  data3
function fn() {
  if (data1) {
    data2
  } else {
    data3
  }
  // ...
}

// 1. 监听数据的读取和修改
defineProperty
Proxy
// 2. 如何知晓数据对应的函数 (data2: fn) ===> 依赖收集
//    对应函数重新执行的过程             ===> 派发更新

读信息 依赖收集
写信息 派发更新(更改了对象的结构或者内容)
```

1. 监听数据的读取和修改

- 监听
  同一个对象 对应同一个代理

# 拦截类型

- get ===>对应===> 派发更新 set
- set
- delete ==> 删除原来有的属性触发派发更新
- has ["a" in state] ===>对应===> 派发更新 add delete
- iterator [for(let prop of state)] ===>对应==>派发更新的类型 add or delete
