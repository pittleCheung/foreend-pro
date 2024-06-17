// function analyse(ast, code, module) {
//   //给statement定义属性
// ast.body.forEach(statement => {
//   Object.defineProperties(statement, {
//     _module: { value: module },
//     _source: { value: code.snip(statement.start, statement.end) }
//   })
// });
// }
// module.exports = analyse;


const Scope = require('./scope.cjs');
const walk = require('./walk');
const { hasOwnProperty } = require('../utils');

/**
 * 对语法树进行分析 找到模块声明的变量和使用到的变量
 * @param {*} ast 
 * @param {*} code 
 * @param {*} module 
 */
function analyse(ast, code, module) {
  let currentScope = new Scope({ name: "全局作用域" });
  // 创建作用域链 为了知道我在此模块中声明了哪些变量 这些变量的声明节点是哪个 var name = 1;
  ast.body.forEach(statement => {
    function add2Scope(name) {
      currentScope.add(name); // 把name边路放入当前的作用域
      if (!currentScope.parent) { // 如果没有父作用域 说明这是一个顶级作用域
        statement._defines[name] = true; //在一级节点上定义一个变量_defines.say = true
      }
    }

    Object.defineProperties(statement, {
      // _module: { value: module },
      _source: { value: code.snip(statement.start, statement.end) },
      _defines: { value: {} } //此节点上定义的变量say
    })
    walk(statement, {
      enter(node) {

      },
      leave(node) {

      }
    })
  });

  // 1. 第一遍 
  // 找到每个语句定义的变量
  // export var name = "zhufeng"; 定义一个name
  // 2. 第二遍
  // 找到每个语句用了或者读取到了哪些变量
  // 3. 第三遍 保存变量定义的语句
  // module.definitions[name] = statement
}

module.exports = analyse