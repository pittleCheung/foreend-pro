import { Token } from "./provider"

import "reflect-metadata"

var METADATA_INJECT_KEY = "METADATA_INJECT_KEY"

export function Inject(token) {
  return function (target, key, paramsIndex) {
    console.log(token, paramsIndex)
    Reflect.defineMetadata(
      METADATA_INJECT_KEY,
      token,
      target,
      "index-" + paramsIndex,
    )
    return target
  }
}

export function getInjectToken(target, index) {
  return <Token<any> | undefined>(
    Reflect.getMetadata(METADATA_INJECT_KEY, target, "index-" + index)
  )
}
