const cp = require("child_process")

cp.execFile("./worker.js", function (err, stdout, stderr) {
  if (err) {
    console.error(err)
    return
  }
  console.log(stdout)
})

cp.spawn("node", ["worker.js"])

cp.exec("node worker.js", function (err, stdout, stderr) {
  console.log("some code", stdout)
})
