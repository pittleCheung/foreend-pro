// process.on("message", function (m, server) {
//   console.log("m", m, server)
//   if (m === "server") {
//     server.on("connection", function (socket) {
//       socket.end("handled by child\n")
//     })
//   }
// })

// process.on("message", function (m, server) {
//   if (m === "server") {
//     server.on("connection", function (socket) {
//       socket.end("handled by child, pid is " + process.pid + "\n")
//     })
//   }
// })

var http = require("http")
var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("handled by child, pid is " + process.pid + "\n")
})
process.on("message", function (m, tcp) {
  if (m === "server") {
    tcp.on("connection", function (socket) {
      setTimeout(() => {
        console.log("pittle")
        server.emit("connection", socket)
      }, 1000)
    })
  }
})
