var http = require("http")
http
  .createServer(function (req, res) {
    // // 设置响应头
    // res.setHeader("Connection", "keep-alive")
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.write("123")
    console.log(res._header, req.url)
    res.end()
  })
  .listen(1337, "127.0.0.1")
console.log("Server running at http://127.0.0.1:1337/")
