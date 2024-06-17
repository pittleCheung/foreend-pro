import { handlers } from "./handles.js"
import { isObject } from "./utils.js"

const targetMap = new WeakMap()
export function reactive(target) {
  if (!isObject(target)) {
    return target // 不是对象 直接返回
  }

  if (targetMap.has(target)) {
    return targetMap.get(target) // 如果已经代理了 直接返回
  }

  const proxy = new Proxy(target, handlers)
  targetMap.set(target, proxy) // 存一下新对象的代理
  return proxy
}
