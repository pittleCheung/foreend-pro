var MagicString = require('magic-string');
const magicString1 = new MagicString('var a = 1;');
const magicString2 = new MagicString('var b = 2;');

const bundle = new MagicString.Bundle();

bundle.addSource({
  content: magicString1,
  separator: '\n'
});

bundle.addSource({
  content: magicString2,
  separator: '\n'
});

// 将源代码用立即执行函数包裹
bundle.prepend('(function() {\n');
bundle.append('\n})();');

const result = bundle.toString();
const sourcemap = bundle.generateMap({
  file: 'bundle.js',
  includeContent: true,
  hires: true,  // 在 magic-string 中，generateMap() 方法的 hires 参数用于控制生成 Source Map 的详细程度。当 hires 参数设置为 true 时，将生成更详细和精确的 Source Map。
  // /* 必需参数 */
  // file: string; // 生成的文件名
  // /* 可选参数 */
  // sourceMapFile?: string; // 指定生成的 Source Map 文件的路径和文件名，默认为与生成的文件相同，只是扩展名为 .map
  // includeContent?: boolean; // 是否在生成的 Source Map 中包含源代码内容，默认为 false
  // hires?: boolean; // 控制生成的 Source Map 的详细程度，默认为 false
});

// 手动设置了 sourcemap.sourcesContent 属性，将源代码文件的内容列表传递给它。
sourcemap.sourcesContent = [
  'var a = 1;',
  'var b = 2;'
];

console.log(result);

// 生成source map 文件
console.log(sourcemap.toString());