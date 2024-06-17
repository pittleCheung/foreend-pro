// 方式一
var net = require("net")
var server = net.createServer(function (socket) {
  // 新的连接
  socket.on("data", function (data) {
    socket.write("你好")
  })
  socket.on("end", function () {
    console.log("连接断开")
  })
  socket.write("还原\n")
})
server.listen(8124, function () {
  console.log("server bound")
})

// 方式二
// var net = require("net")
// var server = net.createServer()
// server.on("connection", function (socket) {
//   //新的连接
//   console.log("connect")
// })
// server.listen(8124)
