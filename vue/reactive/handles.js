import { track, trigger } from "./effective.js"
import { TrackOpTypes, TriggerOpTypes } from "./oprations.js"
import { reactive } from "./reactive.js"
import { hasChange, isObject } from "./utils.js"

function get(target, key, receiver) {
  track(target, TrackOpTypes.GET, key)
  const result = Reflect.get(target, key, receiver)
  // 如果是对象继续往下代理
  if (isObject) {
    return reactive(result)
  }
  // target[[GET]](key,target) //  target[key]内部默认的操作
  // return target[key] // 返回对象的相应的属性值  这样使用假设获取对象的c属性,c属性是一个get {get c(){return this.a + this.b}}, 那么 this.a这里的this指向就是默认target
  // 而我们希望的是这里的this是receiver 那么Reflect的第三个参数就是this
  return result
}

function set(target, key, value) {
  // target[key] = value // 设置对象对应的属性值
  // return true // 赋值成功返回true 赋值失败返回false  返回true还是false取决上一行的代码能不能执行成功 可以利用try catch或者使用反射

  // const oldValue = Reflect.get(target,key,receiver) //不能用这种方式  因为假设对象是 {get c(){return this.a + this.b}} 这种形式获取c属性 相当于在派发更新的时候又会没必要的进行依赖收集
  const oldValue = target[key]
  // 派发更新可以是添加 可以是设置属性
  const type = target.hasOwnProperty(key)
    ? TriggerOpTypes.SET
    : TriggerOpTypes.ADD
  const result = Reflect.set(target, key, value)

  if (!result) {
    // 赋值不成功
    return
  }

  // 派发更新条件 值有变化 || 新增属性
  if (hasChange(oldValue, value) || type === TrackOpTypes.ADD) {
    // 思考一下值的变化 为什么不用===?   因为-0===+0  NaN !== NaN
    // 假设 1/state.a  假设当前state.a 开始是+0 结果是Infinite 然后state.a = -0 结果是-Infinite 此时state的变化影响到了函数的运行结果
    // Object(+0,-0) false  Object(NaN,NaN) true
    trigger(target, type, key)
  }

  // TODO: 判断操作类型...
  // 派发更新
  // trigger(target, key)
  return result
}

function has(target, key) {
  // 依赖收集
  track(target, TrackOpTypes.HAS, key)
  return Reflect.has(target, key) // 判断对象是否具有相应的属性值
}

function ownKeys(target) {
  // 依赖收集
  track(target, TrackOpTypes.ITERATER)
  return Reflect.ownKeys(target)
}

function deleteProperty(target, key) {
  const hasKey = target.hasOwnProperty(key)
  const result = Reflect.deleteProperty(target, key)
  // 派发更新条件
  // 原来有现在没有 && 删除成功
  if (hasKey && result) {
    trigger(target, TriggerOpTypes.DELETE, key)
  }
  return result
}

export const handlers = {
  get,
  set,
  has,
  ownKeys,
  deleteProperty,
}
