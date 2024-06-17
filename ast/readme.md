AST

1. 词法分析 把语句分成一个一个的单词(token) 不关心语法含义 token 数组成为 token 流
2. 语法分析 根据 token 进行语法分析 生成语法树

# Acorn vs Esprima

Acorn 和 Esprima 都是 JavaScript 解析器，可以将 JavaScript 代码解析为抽象语法树（AST）。它们的使用方法和功能类似，但有些许不同之处。

Acorn 是由 Mozilla 开发的 JavaScript 解析器，它是一个轻量级的、快速的解析器，支持 ECMAScript 2022 标准，具有较好的容错能力和可扩展性。Acorn 使用的是状态机解析器算法，能够将 JavaScript 代码解析为一棵符合 ESTree 规范的抽象语法树。

Esprima 是由 Ariya Hidayat 开发的 JavaScript 解析器，是第一个符合 ECMAScript 2015 标准的 JavaScript 解析器，支持 ECMAScript 的最新规范。Esprima 采用递归下降解析器算法，能够将 JavaScript 代码解析为符合 ESTree 规范的抽象语法树。

相对而言，Acorn 的解析速度比 Esprima 更快，而且更加灵活和可扩展，适用于一些需要高效解析 JavaScript 代码的场景，如编辑器或 IDE 中的代码高亮和自动补全等。而 Esprima 虽然解析速度略慢，但在语法支持和规范兼容性上较为全面，适用于一些需要高精度解析 JavaScript 代码的场景，如代码质量检查、代码风格检查等。

同时，Acorn 和 Esprima 都是基于 JavaScript 语言编写的，可以运行在浏览器端和 Node.js 环境中。在实际开发中，可以根据具体的需求和场景选择使用不同的 JavaScript 解析器。

## 实现 JSX 语法转成 JS 语法的编译器

需求：将一段 JSX 语法的代码生成一个 AST，并支持遍历和修改这个 AST，将 AST 重新生成 JS 语法的代码
将

```html
<h1 id="title"><span>hello</span>world</h1>
```

转换为

```js
React.createElement(
  "h1",
  { id: "title" },
  React.createElement("span", null, "hello"),
  "world"
)
```

- 过程

1. 将 HTML 标记<h1 id="title"><span>hello</span>world</h1>解析为 AST，得到以下的 AST 结构：

```js
{
  "type": "element",
  "tagName": "h1",
  "properties": {
    "id": "title"
  },
  "children": [
    {
      "type": "element",
      "tagName": "span",
      "properties": {},
      "children": [
        {
          "type": "text",
          "value": "hello"
        }
      ]
    },
    {
      "type": "text",
      "value": "world"
    }
  ]
}
```

2. 根据 AST 结构生成 React 元素，具体过程如下：
   - 根据 AST 根节点的 tagName 属性生成 React 元素的类型，即"h1"。
   - 根据 AST 根节点的 properties 属性生成 React 元素的属性对象，即{ id: "title" }。
   - 遍历 AST 根节点的 children 数组，将每个子节点都转换为 React 元素，并作为 React 元素的子元素。具体转换方式如下：
     -- 对于 AST 中的元素节点，以其 tagName 属性为类型，以其 properties 属性为属性对象，以其 children 数组为子元素，生成对应的 React 元素。
     -- 对于 AST 中的文本节点，以其 value 属性为文本内容，生成对应的 React 文本节点。
   - 最终生成的 React 元素为：React.createElement("h1", { id: "title" }, React.createElement("span", null, "hello"), "world")。
   - 因此，在将<h1 id="title"><span>hello</span>world</h1>转换为 React.createElement("h1", { id: "title" }, React.createElement("span", null, "hello"), "world")的过程中，我们需要先将 HTML 标记解析为 AST，再从 AST 生成 React 元素。
