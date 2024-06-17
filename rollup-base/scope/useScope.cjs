var a = 1
function one() {
  var b = 1
  function two() {
    var c = 2
    console.log(a, b, c)
  }
}
let Scope = require("./scope.cjs")
let globalScope = new Scope({ name: "global", names: ["a"], parent: null })
let oneScope = new Scope({ name: "one", names: ["b"], parent: globalScope })
let twoScope = new Scope({ name: "two", names: ["c"], parent: oneScope })
console.log(
  twoScope.findDefiningScope("a"),
  twoScope.findDefiningScope("b"),
  twoScope.findDefiningScope("c"),
)
