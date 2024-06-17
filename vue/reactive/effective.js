// 依赖收集

import { TrackOpTypes } from "./oprations.js"

export function track(target, type, key) {
  if (type === TrackOpTypes.ITERATER) {
    console.log(`%c依赖收集: {${type}}`, "color:#0f0")
    return
  }
  console.log(`%c依赖收集: {${type}} ${key}`, "color:#0f0")
}

// 派发更新
export function trigger(target, type, key) {
  console.log(`%c派发更新: {${type}} ${key}`, "color:#f0f")
}
