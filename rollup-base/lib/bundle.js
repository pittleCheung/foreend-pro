let fs = require('fs');
let path = require('path');
let Module = require('./module');
let MagicString = require('magic-string');
class Bundle {
  constructor(options) {
    //入口文件数据
    this.entryPath = path.resolve(options.entry.replace(/\.js$/, '') + '.js');
    // "/Users/pittle/2021-foreend/Vue/vite-deep-learning/rollup-base/src/main.js"
    // console.log(this.entryPath, '======')
    this.modules = {};//存放所有的模块
  }
  build(filename) {
    // 1. 打包编译  2. 输出到filename
    let entryModule = this.fetchModule(this.entryPath);
    // 3. 创建module 在module中做抽象语法树遍历
    this.statements = entryModule.expandAllStatements(true);
    const { code } = this.generate({});

    // console.log(entryModule, '=====>code');

    fs.writeFileSync(filename, code);
  }
  // 根据entryPath 将代码读出来 然后作为参数 创建entryModule
  fetchModule(importee) {
    let route = importee;
    if (route) {
      let code = fs.readFileSync(route, 'utf8'); // route = importee == this.entryPath
      const module = new Module({
        code,
        path: importee,
        bundle: this
      })
      return module;
    }
  }
  generate(options) {
    let magicString = new MagicString.Bundle();
    this.statements.forEach(statement => {
      // const source = statement._source.clone();
      // magicString.addSource({
      //   content: source,
      //   separator: '\n'
      // })
      magicString.addSource({
        content: statement._source.toString(),
        separator: '\n'
      })

    })
    return { code: magicString.toString() }
    // return { code: magicString.toString() }
  }
}
module.exports = Bundle;