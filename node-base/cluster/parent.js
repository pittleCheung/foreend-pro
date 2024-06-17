// cluster.js
var cluster = require("cluster")
cluster.setupMaster({ exec: "worker.js" })
var cpus = require("os").cpus()
for (var i = 0; i < cpus.length; i++) {
  cluster.fork()
}

// var cluster = require("cluster")
// var http = require("http")
// var numCPUs = require("os").cpus().length
// if (cluster.isMaster) {
//   console.log("cluster isMaster", cluster.isMaster)
//   // Fork workers
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork()
//   }
//   cluster.on("exit", function (worker, code, signal) {
//     console.log("worker " + worker.process.pid + " died")
//   })
// } else {
//   // Workers can share any TCP connection
//   // In this case its a HTTP server
//   console.log("cluster createServer")
//   http
//     .createServer(function (req, res) {
//       res.writeHead(200)
//       res.end("hello world\n")
//     })
//     .listen(8000)
// }
