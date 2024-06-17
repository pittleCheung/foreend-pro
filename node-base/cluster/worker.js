var http = require("http")
var server = http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("handled by child, pid is " + process.pid + "\n")
  })
  .listen(8000)
var worker
process.on("message", function (m, tcp) {
  if (m === "server") {
    worker = tcp
    worker.on("connection", function (socket) {
      server.emit("connection", socket)
    })
  }
})
process.on("uncaughtException", function () {
  // 停止接收新的连接
  // 等待当前连接断开后再退出进程是为了确保程序在退出时能够尽可能地处理完所有正在进行的操作和与客户端的通信，以保证数据的完整性和安全性。
  worker.close(function () {
    // 所有已有连接断开后 退出进程
    process.exit(1)
  })
})
