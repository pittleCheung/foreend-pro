# nc

`nc`（netcat）命令是一个功能强大的网络工具，它可以用来创建 TCP/UDP 连接、监听端口、进行端口扫描等。`nc` 命令通常用于网络调试、数据传输等方面。

以下是一些 `nc` 命令的常见用法：

1. 创建 TCP 连接

可以使用 `nc` 命令创建一个 TCP 连接到指定的主机和端口，例如：

```
nc example.com 80
```

这将创建一个 TCP 连接到 `example.com` 的 80 端口。

2. 监听端口

可以使用 `nc` 命令在本地主机上监听一个端口，并将收到的所有数据打印到标准输出，例如：

```
nc -l 1234
```

这将监听本地主机的 1234 端口，并将收到的所有数据打印到标准输出。

3. 进行端口扫描

可以使用 `nc` 命令进行端口扫描，例如：

```
nc -v -z example.com 1-1000
```

这将对 `example.com` 的 1 到 1000 端口进行扫描，并打印出哪些端口是开放的。

4. 文件传输

可以使用 `nc` 命令在两台主机之间传输文件，例如：

在接收端运行：

```
nc -l 1234 > file.txt
```

在发送端运行：

```
nc example.com 1234 < file.txt
```

这将在接收端监听 1234 端口，并将收到的所有数据写入到 `file.txt` 文件中。发送端连接到接收端的 1234 端口，并将 `file.txt` 文件中的数据发送到接收端。

需要注意的是，`nc` 命令并不是一个安全的工具，因为它可以被用于进行网络攻击和滥用。在使用时应谨慎，遵守相关的法律法规和道德准则。

# 创建 TCP 服务器

```js
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
var net = require("net")
var server = net.createServer()
server.on("connection", function (socket) {
  //新的连接
  console.log("connect")
})
server.listen(8124)
```

## 创建 udp 服务端

```js
// 服务端代码
var dgram = require("dgram")
var server = dgram.createSocket("udp4")
server.on("message", function (msg, rinfo) {
  console.log(
    "server got: " + msg + " from " + rinfo.address + ":" + rinfo.port,
  )
})
server.on("listening", function () {
  var address = server.address()
  console.log("server listening " + address.address + ":" + address.port)
})

server.bind(41234)

// 客户端测试
echo "Hello, server" | nc -u 0.0.0.0 41234
```
