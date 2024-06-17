const acorn = require('acorn');
const walk = require('./walk');
const sourceCode = 'import $ from "jquery"'
const ast = acorn.parse(sourceCode, {
  locations: true, ranges: true, sourceType: 'module', ecmaVersion: 8
});
let indent = 0;
const padding = () => ' '.repeat(indent)

// console.log(ast.body[0]);
// Node {
//   type: 'Program',
//     start: 0,
//       end: 16,
//         loc: SourceLocation {
//     start: Position { line: 1, column: 0 },
//     end: Position { line: 1, column: 16 }
//   },
//   range: [0, 16],
//     body: [
//       Node {
//         type: 'FunctionDeclaration',
//         start: 0,
//         end: 16,
//         loc: [SourceLocation],
//         range: [Array],
//         id: [Node],
//         expression: false,
//         generator: false,
//         async: false,
//         params: [],
//         body: [Node]
//       }
//     ],
//     sourceType: 'module'
// }

ast.body.forEach((statement) => {
  walk(statement, {
    enter(node) {
      if (node.type) {
        console.log(padding() + node.type + "进入");
        indent += 2;
      }
    },
    leave(node) {
      if (node.type) {
        indent -= 2;
        console.log(padding() + node.type + "离开");
      }
    }
  });
});
