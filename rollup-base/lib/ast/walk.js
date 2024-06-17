function walk(astNode, { enter, leave }) {
  visit(astNode, null, enter, leave);
}
function visit(node, parent, enter, leave) {
  if (enter) {
    enter.call(null, node, parent);
  }
  let keys = Object.keys(node).filter(key => typeof node[key] === 'object')
  // console.log("===>>>", keys)
  keys.forEach(key => {
    let value = node[key];
    // console.log("===>>>", key)
    if (Array.isArray(value)) {
      value.forEach(val => visit(val, node, enter, leave));
    } else if (value && value.type) {
      visit(value, node, enter, leave)
    }
  });
  if (leave) {
    leave.call(null, node, parent);
  }
}


module.exports = walk;

// Node {
//   type: 'ImportDeclaration',
//   start: 0,
//   end: 22,
//   loc: SourceLocation {
//     start: Position { line: 1, column: 0 },
//     end: Position { line: 1, column: 22 }
//   },
//   range: [0, 22],
//   specifiers: [
//       Node {
//         type: 'ImportDefaultSpecifier',
//         start: 7,
//         end: 8,
//         loc: [SourceLocation],
//         range: [Array],
//         local: [Node]
//       }
//    ],
//    source: Node {
//    type: 'Literal',
//    start: 14,
//    end: 22,
//    loc: SourceLocation { start: [Position], end: [Position] },
//    range: [14, 22],
//    value: 'jquery',
//    raw: '"jquery"'
//    }
// }