// 存放本模块导入了哪些变量
this.imports = {}
// 存放本模块的变量导出哪些变量
this.exports = {}
// 存放本模块的变量定义语句
this.definitions = {}


// 对于msg.js
this.exports = {
  'name': { localName: 'name', exportName: 'name' },
  'age': { localName: 'age', exportName: 'age' }
}

// 考虑别名的这种情况
// export {
//   name as n
// }
// this.exports = {
//   'n': { localName: 'name', exportName: 'n' },
//   'age': { localName: 'age', exportName: 'age' }
// }
// 本模块定义的变量的语句
this.definitions = {
  name: `export var name = 'pittle'`,
  age: `export var age = 12`
}


// 对于main.js
this.imports = {
  'name': { importName: "name", source: "./msg" },
  'age': { importName: "age", source: "./msg" }
}
this.definitions = {
  say: `function say(){}`
}

// 考虑别名的情况
// import { name as n, age } from "./msg"
// this.imports = {
//   'n': { importName: "name", source: "./msg" },
//   'age': { importName: "age", source: "./msg" }
// }

