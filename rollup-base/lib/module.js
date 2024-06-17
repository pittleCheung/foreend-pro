const MagicString = require('magic-string');
const { parse } = require('acorn');
let analyse = require('./ast/analyse');
class Module {
  constructor({ code, path, bundle }) {
    // { filename: path } 是source-map的时候用的
    this.code = new MagicString(code, { filename: path });
    // console.log(this.code.toString())
    this.path = path;
    this.bundle = bundle;
    // ecmaVersion:7 指解析JavaScript代码的版本为ECMAScript 2016（即ECMAScript 7）
    // sourceType: 'module' 指定代码的类型为模块（module），这样可以使用模块化的语法来书写代码。
    this.ast = parse(code, {
      ecmaVersion: 7,
      sourceType: 'module'
    })
    // console.log(this.ast)
    // 存放本模块导入了哪些变量
    this.imports = {}
    // 存放本模块的变量导出哪些变量
    this.exports = {}
    // 存放本模块的变量定义语句
    this.definitions = {}
    // 进行语法分析
    this.analyse();
  }
  analyse() {
    console.log(this.ast, 'ast')
    // analyse(this.ast, this.code, this);
    this.ast.body.forEach(statement => {
      if (statement.type === "ImportDeclaration") {
        let source = statement.source.value; // ./msg
        statement.specifiers.forEach(specifiers => {
          let importName = specifiers.imported.name; // 导入的变量名
          let localName = specifiers.local.name;  // 本地的变量名
          this.imports[localName] = { source, importName }
        })
      } else if (statement.type === "ExportNamedDeclaration") {
        const declaration = statement.declaration;
        const specifiers = statement.specifiers;
        if (declaration && declaration.type === 'VariableDeclaration') {
          // export var name = 'pittle';
          const declarations = declaration.declarations;
          // export  var age = 12,age1 = 234;
          // 导出的变量可能是多个 因此declarations 是变量组成的数组
          declarations.forEach(variableDeclarator => {
            const localName = variableDeclarator.id.name;
            const exportName = localName;
            this.exports[exportName] = { localName }
          })
        } else if (specifiers) {
          // 这种情况
          // export {
          //   name as n
          // }
          specifiers.forEach(exportSpecifier => {
            let localName = exportSpecifier.local.name; // 本地变量名 name
            let exportName = specifiers.exported.name;  // 导出的变量名 n
            this.exports[exportName] = { localName }
          })
        }
      }
    })
    analyse(this.ast)
  }
  expandAllStatements() {
    // 写了这么多 就相当于return this.ast.body
    let allStatements = [];
    this.ast.body.forEach(statement => {
      statement._source = this.code.snip(statement.start, statement.end) // 截取
      console.log(statement._source.toString(), 'statement._source') //let a = 1; statement._source

      let statements = this.expandStatement(statement);
      // [
      //   Node {
      //       type: 'VariableDeclaration',
      //       start: 48,
      //       end: 57,
      //       declarations: [[Node]],
      //       kind: 'let',
      //       _source: MagicString {},
      //       _included: true
      //   }
      // ]
      allStatements.push(...statements);
    });
    return allStatements;
  }
  expandStatement(statement) {
    statement._included = true;  // 这是一个标记 标记此语句一定会包含在输出语句里
    let result = [];
    result.push(statement);
    return result;
  }
}
module.exports = Module;