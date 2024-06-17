var http = require("http")

const port = Math.round((1 + Math.random()) * 1000)
console.log(port)
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("Hello World\n")
  })
  .listen(port, "127.0.0.1")
