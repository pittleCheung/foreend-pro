var fork = require("child_process").fork
var cpus = require("os").cpus()
var server = require("net").createServer()
server.listen(12306)
var workers = {}
var createWorker = function () {
  var worker = fork(__dirname + "/worker.js")
  // 退出时重启动新的进程
  worker.on("exit", function () {
    console.log("Worker " + worker.pid + " exited.")
    delete workers[worker.pid]
    createWorker()
  })
  // 句柄转发
  worker.send("server", server)
  workers[worker.pid] = worker
  console.log("Create worker. pid: " + worker.pid)
}

for (var i = 0; i < 2; i++) {
  createWorker()
}
// 进程自己退出时，所有的工作进程退出
process.on("exit", function () {
  for (var pid in workers) {
    workers[pid].kill()
  }
})
// 执行ctrl + c会触发SIGINT 事件
process.on("SIGINT", function () {
  console.log("Received SIGINT signal, exiting...")
  process.exit(0)
})
