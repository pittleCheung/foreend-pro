// 单个子进程
// var child = require("child_process").fork("child.js")

// var server = require("net").createServer()
// server.on("connection", function (socket) {
//   socket.end("handled by parent\n")
// })
// server.listen(1337, function () {
//   child.send("server", server)
// })

// 多个子进程
// var cp = require("child_process")
// var child1 = cp.fork("child.js")
// var child2 = cp.fork("child.js")
// // Open up the server object and send the handle
// var server = require("net").createServer()
// server.on("connection", function (socket) {
//   socket.end("handled by parent\n")
// })
// server.listen(1337, function () {
//   child1.send("server", server)
//   child2.send("server", server)
// })

// 父进程关掉 全都让子进程处理
var cp = require("child_process")
var child1 = cp.fork("child.js")
var child2 = cp.fork("child.js")
// Open up the server object and send the handle
var server = require("net").createServer()
server.listen(1337, function () {
  child1.send("server", server)
  child2.send("server", server)
  // 关掉
  // server.close()的作用是停止服务器监听指定端口，而不是终止父进程的执行。
  server.close()
})
