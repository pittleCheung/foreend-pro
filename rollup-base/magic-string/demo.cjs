const MagicString = require('magic-string');

// 定义一个ES6模块
const code = `
  import { greet } from './greet';
  const message = greet('World');
  console.log(message);
`;

// 将模块转换为MagicString对象
const magicString = new MagicString(code);

// 对模块进行转换，将ES6代码转换为ES5代码
magicString.overwrite(0, code.indexOf('{'), 'function()');
magicString.overwrite(code.indexOf('{') + 1, code.indexOf('}'), 'return greet("World")');

// 将MagicString对象转换回字符串形式，并生成相应的source-map
const result = {
  code: magicString.toString(),
  map: magicString.generateMap({
    hires: true,
    source: 'module.js',
  })
};

console.log(result.code);
console.log(result.map);
