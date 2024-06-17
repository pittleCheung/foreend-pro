# 创建子进程进程

后面三种方法都是 spawn 的扩展延伸

```js
// 1. 使用 spawn
const { spawn } = require("child_process")

const child = spawn("node", ["worker.js"])

child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`)
})

child.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`)
})

child.on("close", (code) => {
  console.log(`child process exited with code ${code}`)
})

// 2. 使用exec
var cp = require("child_process")
cp.exec("node worker.js", function (err, stdout, stderr) {
  console.log("some code", stdout)
})

// 3. 使用execFile
var cp = require("child_process")
cp.execFile("./worker.js", function (err, stdout, stderr) {
  if (err) {
    console.error(err)
    return
  }
  console.log(stdout)
})
// 这里的worker.js 文件头部需要加 #!/usr/bin/env node 并且 chmod +x worker.js

// 4. fork
var cp = require("child_process")
cp.fork("./worker.js")
```

# 进程间的通信

通过 fork()或者其他 api，创建子进程后后，为了实现父子进程之间的通信，父进程与子进程将会创建 ipc 通道，通过 ipc 通道，父子进程之间才能通过 message 和 send()传递消息

```js
// parent.js
var cp = require("child_process")
var n = cp.fork(__dirname + "/sub.js")
n.on("message", function (m) {
  console.log("PARENT got message:", m)
})
n.send({ hello: "world" })

// worker.js
process.on("message", function (m) {
  console.log("message======", m)
})
process.send({ foo: "bar" })
```

IPC 的 全称 是 Inter-Process Communication，进程通信。进程通信的目的是为了让不同的进程程能相互访问资源源并进行协调工作。
实现进程间通信（IPC）的技术有很多种，包括管道（pipe）、消息队列、套接字（socket）、信号量、共享内存、信号、域套接字（Domain Socket）等。在 Node.js 中，实现 IPC 的是管道（pipe）技术。管道是一个单向的通信通道，在 Node.js 中由 libuv 库实现，在 Windows 下使用命名管道（named pipe），在\*nix 系统中使用 Unix Domain Socket 实现。在应用层面上的进程间通信只有基于消息的 send()和接收机制。

在创建子进程之前，父进程会创建并初始化一个 IPC 管道，并在创建子进程时将这个已存在的 IPC 管道传递给子进程，通过环境变量（NODE_CHANNEL_FD）进行通信。子进程在运行过程中可以接收这个已经存在的 IPC 管道，从父进程那里接收消息。

## 句柄的传递

```js
var http = require("http")
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("Hello World\n")
  })
  .listen(8888, "127.0.0.1")
// 再次启动动master.js，如下显示
// events.js:72
// throw er; // Unhandled 'error' event
// Error: listen EADDRINUSE
//          at errnoException (net.js:884:11)
如果让服务器都监听相同的端口，将会出现什么样的结果?
这时只有一个工作进程能够监听到该端口上，其余的进程在监听的过程中都抛出了EADDRINUSE异常，这是端口被占用的情况下新的进程不能继续监听该端口了。这个问题破坏了多个进程监听同一个端口的想法。
```

1. 句柄可以是一个指向服务端 socket 对象、客户端 socket 对象、UDP 套接字对象或者管道对象的引用

```js
//这个例子中直接将一个TCP服务器发送给了子进程。
// parent.js
var child = require("child_process").fork("child.js")

var server = require("net").createServer()
server.on("connection", function (socket) {
  socket.end("handled by parent\n")
})
server.listen(1337, function () {
  child.send("server", server)
})

// child.js
process.on("message", function (m, server) {
  console.log("m", m, server)
  if (m === "server") {
    server.on("connection", function (socket) {
      socket.end("handled by child\n")
    })
  }
})

// test
// $ curl "http://127.0.0.1:1337/"
// handled by child, pid is 24673
// $ curl "http://127.0.0.1:1337/"
// handled by parent
```

2. 试试 在 服务发送多个子进程

```js
// parent.js
var cp = require("child_process")
var child1 = cp.fork("child.js")
var child2 = cp.fork("child.js")
// Open up the server object and send the handle
var server = require("net").createServer()
server.on("connection", function (socket) {
  socket.end("handled by parent\n")
})
server.listen(1337, function () {
  child1.send("server", server)
  child2.send("server", server)
})

// child.js
process.on("message", function (m, server) {
  if (m === "server") {
    server.on("connection", function (socket) {
      socket.end("handled by child, pid is " + process.pid + "\n")
    })
  }
})
// for i in {1..10}; do curl 127.0.0.1:1337; done
// 每次结果都可能不同 结果有可能被父进程处理
```

3. 所有的请求都是由子进程处理了。
   child1.send("server", server) 的目的是将服务器实例 server 的句柄（handle）发送给子进程 child1。

在下面这段代码中，通过将服务器实例的句柄发送给子进程，实际上是将服务器实例的文件描述符传递给子进程。这种方式可以避免操作系统为子进程创建新的文件描述符，从而减少了文件描述符的消耗。

文件描述符是操作系统对打开的文件或套接字的引用，用于标识和访问这些资源。每个进程都有一个文件描述符表，用于记录其打开的文件和套接字。操作系统有一个限制，即每个进程能够同时打开的文件描述符数量是有限的。如果达到文件描述符的限制，进程将无法再打开新的文件或套接字。

在多进程模型中，通常每个进程都会独立创建自己的服务器实例，并监听相同的端口。这样就会导致每个进程都需要占用一个文件描述符来监听同一个端口。当并发连接数很高时，文件描述符的消耗会很大，可能超过操作系统的限制。

但是，通过将服务器实例的句柄传递给子进程，子进程可以重用父进程已经打开的文件描述符，而无需重新创建自己的服务器实例和关联的文件描述符。这样可以减少文件描述符的消耗，因为多个进程共享同一个文件描述符来监听端口。

通过这种方式，可以实现多进程共享同一个服务器实例，提高系统的并发处理能力，并降低了文件描述符的消耗。

```js
// 父进程关掉 全都让子进程处理
// parent.js
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
  // 能够使用 curl "http://127.0.0.1:1337/" 访问的原因是，你可能正在使用一个已经建立的连接，该连接在调用 server.close() 之前已经建立了。一旦这些连接完成了它们的请求和响应过程，就再也无法通过该端口进行通信了。
  // 这是因为子进程中的HTTP服务器仍然在运行，并且它通过收到的服务器对象处理来自客户端的请求。
})

// child.js
var http = require("http")
var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("handled by child, pid is " + process.pid + "\n")
})
process.on("message", function (m, tcp) {
  // 这里参数用tcp是父进程传过来的进程对象 tcp的名称是区分当前的子server
  if (m === "server") {
    tcp.on("connection", function (socket) {
      // 每次进行连接请求(curl)都会 手动触发connection
      server.emit("connection", socket)
    })
  }
})
```

## 自动重启

下面的代码流程是，一旦有未捕获的异常出现，工作进程就会马上停止新的接收新的连接，当所有的连接断开后退出进程。
主进程在侦听到工作进程的 exit 后 将会立即启动新的进程服务。以此保证整个集群总有进程为用户服务。

parent.js

```js
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

for (var i = 0; i < cpus.length; i++) {
  createWorker()
}
// 进程退出时，所有的工作进程退出
process.on("exit", function () {
  for (var pid in workers) {
    workers[pid].kill()
  }
})
// 执行ctrl + c会触发SIGINT 事件
process.on("SIGINT", function () {
  console.log("Received SIGINT signal, exiting...")
  // 如果这一行不写 将会非常危险的  我们创建的进程就会一直存在 即时我ctrl + c了(由于这个程序的特殊性每次挂掉一个线程会起一个新的线程 因此就会一直存在, 这样很危险会导致系统内存泄漏)
  process.exit(0)
})
```

worker.js

```js
var http = require("http")
var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("handled by child, pid is " + process.pid + "\n")
})
var worker
process.on("message", function (m, tcp) {
  if (m === "server") {
    worker = tcp
    worker.on("connection", function (socket) {
      server.emit("connection", socket)
    })
  }
})
// 等待当前连接断开后再退出进程是为了确保程序在退出时能够尽可能地处理完所有正在进行的操作和与客户端的通信，以保证数据的完整性和安全性。
process.on("uncaughtException", function () {
  // 停止接收新的连接
  // worker.close() 就是用于关闭子进程的方法，它会停止子进程接收新的连接请求，并等待所有已有连接断开后再关闭子进程。
  worker.close(function () {
    // 所有已有连接断开后 退出进程 同时触发父进程的监听事件
    process.exit(1)
    // 当传递参数为 0 时，表示程序正常退出。 当传递参数为非 0 值时，表示程序异常退出或发生了错误。
  })
})
// 当程序中发生未处理的异常时，会触发 uncaughtException 事件处理函数。在该处理函数中，首先调用 worker.close() 方法停止接收新的连接，然后等待所有已有连接断开后调用 process.exit(1) 方法退出进程。
// setTimeout(() => {
//   throw Error("程序崩溃了")
// }, 2000)
```

## 使用 cluster

下面这段代码中，主进程（Master）使用 cluster.fork() 根据 CPU 核心数量创建了多个工作进程（Worker）。每个工作进程都会执行 http.createServer(...).listen(8000) 来创建一个 HTTP 服务器，并监听在 8000 端口上。

尽管每个工作进程都监听了相同的 8000 端口，但并不会导致问题。这是因为 Cluster 模块内部使用了操作系统的进程管理功能，具体来说，它利用了操作系统的文件描述符复制机制。

当主进程调用 cluster.fork() 创建工作进程时，操作系统会在新的工作进程中复制主进程的文件描述符，包括监听的 TCP 连接。这样，每个工作进程都有了自己的独立的 TCP 连接，并且可以独立地处理请求。

虽然多个工作进程监听同一个端口，但操作系统会根据负载均衡算法将到达该端口的请求分发给不同的工作进程。这样可以实现并发处理请求，提高服务器的性能和吞吐量。

因此，当有多个工作进程同时监听同一个端口时，并不会造成冲突或问题，而是利用了操作系统的机制实现了负载均衡和并发处理。

```js
var cluster = require("cluster")
var http = require("http")
var numCPUs = require("os").cpus().length
if (cluster.isMaster) {
  console.log("cluster isMaster", cluster.isMaster)
  // Fork workers
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on("exit", function (worker, code, signal) {
    console.log("worker " + worker.process.pid + " died")
  })
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
  console.log("cluster createServer")
  http
    .createServer(function (req, res) {
      res.writeHead(200)
      res.end("hello world\n")
    })
    .listen(8000)
}
```

或者使用下面这种

```js
// parent.js
var cluster = require("cluster")
cluster.setupMaster({ exec: "worker.js" })
var cpus = require("os").cpus()
for (var i = 0; i < cpus.length; i++) {
  cluster.fork()
}

// worker.js
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
```
