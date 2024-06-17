const path = require("path")
const rollup = require("./lib/rollup")
let entry = path.resolve(__dirname, "src/main.js")
// debugger;
// console.log(entry, 'entry')
rollup(entry, "bundle.js")
