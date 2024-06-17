import "reflect-metadata"
// 参数装饰器
function log(parameter, context, index) {
  console.log(`Logging ${parameter} at index ${index}`)
}

function classD(target) {
  console.log("classD")
}

@classD
class Example {
  public sum(@log a: number, b: number) {
    return a + b
  }
}
// ts-node params.ts 结果如下
var example = new Example()
var FuncTypes = Reflect.getMetadata("design:type", example, "sum")
var paramTypes = Reflect.getMetadata("design:paramtypes", example, "sum")
var returnTypes = Reflect.getMetadata("design:returntype", example, "sum")
console.log(
  "paramTypes=>",
  paramTypes,
  "FuncTypes=>",
  FuncTypes,
  "returnTypes=>",
  returnTypes,
) // 这里将会输出 sum 方法的参数类型信息
