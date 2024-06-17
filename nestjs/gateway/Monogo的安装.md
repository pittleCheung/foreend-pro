## 连接 mongo 数据库的问题

问题:
ERROR [ExceptionHandler] connect ECONNREFUSED ::1:27017
MongoServerSelectionError: connect ECONNREFUSED ::1:27017

```js
我之前在window下使用 localhost 是没有问题的
mongoose.connect("mongodb://localhost:27017/moviedb").then(() => {
  console.log("连接数据库成功")
})
mac 下使用localhost会出现上述的问题 应该改成127.0.0.1
mongoose.connect("mongodb://127.0.0.1:27017/moviedb").then(() => {
  console.log("连接数据库成功")
})

这个错误通常是由于在 Mac 上的 MongoDB 配置中使用了 IPv6 地址而导致的。IPv6 地址的格式类似于 ::1，而在 Mac 上默认情况下会优先使用 IPv6 地址进行网络通信。然而，并不是所有的 MongoDB 版本都支持 IPv6 地址连接，这就导致了 MongooseServerSelectionError: connect ECONNREFUSED ::1:27017 错误。
```

1. ::1 是什么

在大多数情况下，IPv6 的 地 loopback 址为 ::1，表示本机上的一个虚拟接口。这个地址在 IPv4 中对应的是 127.0.0.1，也表示同样的含义。在绝大部分的操作系统和网络设备上，::1 都被固定地配置为 IPv6 的 loopback 地址。如果你想要通过 IPv6 连接到自己的计算机，可以使用 ::1 或者 localhost 来作为目标地址。

在 MongoDB 中，::1 是代表 localhost/loopback 的 IPv6 地址。它类似于 IPv4 的 127.0.0.1 地址，是一个预留的地址，用于在本地主机上进行网络通信。

当你从本地主机上的应用程序尝试连接到 MongoDB 数据库服务器时，如果 MongoDB 驱动程序自动选择了 IPv6 地址族，则它可能会尝试使用 ::1 代表本地主机。

在这个错误消息中，connect ECONNREFUSED ::1:27017 表示 MongoDB 驱动程序尝试连接到 ::1 这个地址的 MongoDB 服务器（默认端口为 27017），但是连接被拒绝了（ECONNREFUSED 错误）。

这种情况通常是由于 MongoDB 服务器未正确启动或连接配置不正确导致的。为了解决这个问题，你可以尝试以下步骤：

确认 MongoDB 服务器已正确启动并监听在指定的端口上。你可以尝试使用 mongo 命令行工具连接到 MongoDB 服务器，并检查是否可以成功连接。

检查 MongoDB 驱动程序的连接配置，确保已正确指定服务器地址、端口以及其他相关参数值。

如果你的计算机上运行了防火墙，请确保已正确配置防火墙规则，允许 MongoDB 驱动程序与 MongoDB 服务器之间的通信。

确认 MongoDB 驱动程序是否正确支持 IPv6 地址族。如果不需要使用 IPv6，则建议在 MongoDB 驱动程序的连接配置中明确指定要使用的地址族，以避免此类连接问题。

2. 如何判断 localhost 地址可能是否使用了 IPv6 协议

在大多数情况下，localhost 和 127.0.0.1 都可以用于指代本地计算机。然而，在一些操作系统中，localhost 地址可能被默认配置为使用 IPv6 协议，这可能导致无法正确连接到 MongoDB 服务器（因为 MongoDB 驱动程序通常使用 IPv4）。
因此，将 host 设置为 127.0.0.1 可以确保使用 IPv4 进行连接，从而避免了 IPv6 的问题。另外，如果你的 MongoDB 服务器实际上不在本地计算机上，而是在网络上的远程计算机上，则需要将 host 设置为该计算机的 IP 地址或主机名。

总之，在设置 MongoDB 数据库连接时，应仔细检查所使用的地址和端口，并根据需要进行相应的调整和优化。同时，也要考虑到网络和防火墙等方面的因素，以确保能够正常连接到 MongoDB 服务器。
如果你想要检查本地计算机是否正在使用 IPv6 协议来解析 localhost 地址，可以使用 ping 命令进行测试。在 Windows 操作系统中，打开命令提示符窗口（或 PowerShell 窗口），输入以下命令：
`ping localhost`
这将尝试对 localhost 地址执行 ping 操作，并返回一些有关网络连接和响应时间的信息。如果输出结果显示使用了 IPv6 地址，则说明本机正在使用 IPv6 协议来解析 localhost 地址。
在 Mac OS X 和 Linux 操作系统中，也可以使用类似的命令来检查 localhost 的解析情况。例如，在终端窗口中输入以下命令：
`ping6 localhost`
这将尝试使用 IPv6 协议对 localhost 地址执行 ping 操作，并显示相关的信息。如果输出结果显示成功的响应，那么说明本机正在使用 IPv6 协议来解析 localhost 地址。
总之，通过运行 ping 或 ping6 命令来测试 localhost 地址的解析情况，可以帮助你诊断和解决 MongoDB 数据库连接问题。如果你发现 localhost 地址使用了 IPv6，你可以尝试将其更改为 IPv4 或指定正确的 IP 地址来确保正常连接 MongoDB 服务器。

```js
ping6 ::1 -c 3
PING6(56=40+8+8 bytes) ::1 --> ::1
16 bytes from ::1, icmp_seq=0 hlim=64 time=0.124 ms
16 bytes from ::1, icmp_seq=1 hlim=64 time=0.157 ms
16 bytes from ::1, icmp_seq=2 hlim=64 time=0.173 ms

--- ::1 ping6 statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/std-dev = 0.124/0.151/0.173/0.020 ms

计算机支持 IPv6 并已正确配置网络。在这种情况下，可能是 MongoDB 的配置存在问题导致连接失败。
检查 MongoDB 服务器的配置文件（通常位于 /etc/mongod.conf 或者 C:\Program Files\MongoDB\Server\VERSIONNUMBER\bin\mongod.cfg 等位置），确保服务器监听了正确的 IP 地址和端口号，并允许外部访问。例如，以下配置可以让 MongoDB 服务器在 IPv6 地址上监听 27017 端口，并允许来自任何 IP 的访问：
net:
  bindIp: "::"
  port: 27017
  ipv6: true
security:
  authorization: enabled
还请注意检查 MongoDB 服务器是否正在运行。如果一切设置正确，您应该可以通过命令行工具（例如 mongo）或 MongoDB 客户端（例如 Compass）成功连接到 MongoDB 服务器。
如果问题仍然存在，请提供更多详细信息以便更好地帮助您解决问题。

我找到了 我本机的配置如下
systemLog:
  destination: file
  path: /opt/homebrew/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /opt/homebrew/var/mongodb
net:
  bindIp: 127.0.0.1

MongoDB 只监听了本地 127.0.0.1 地址，这意味着只有本地的应用程序才能与 MongoDB 进行通信。如果您的应用程序需要从远程服务器连接到 MongoDB，则需要将 bindIp 改为 0.0.0.0 或指定 MongoDB 服务器的公网 IP 地址。
```

## mongodb 安装

菜鸟教程使用方法

> runoob.com/mongodb/mongodb-osx-install.html

brew 启动：
brew services start mongodb-community@4.4

brew 停止：
brew services stop mongodb-community@4.4

查看当前 brew 管理的服务
brew services list

查看进程
ps -ef | grep mongo

mongodb 安装目录
cd /opt/homebrew/opt/mongodb-community@4.4/bin/

find / -name mongod.conf 2>/dev/null
该命令将搜索整个根目录，找到所有名为 mongod.conf 的文件，并将结果返回给您。由于 find 命令搜索整个文件系统可能需要一些时间，因此建议加入 2>/dev/null 来阻止输出无关错误信息。

如果您的 MongoDB 服务器已在运行，则可以通过在 mongo shell 中执行 db.adminCommand({getCmdLineOpts: 1}) 命令来查看正在使用的配置文件路径。

我本机的在
/opt/homebrew/etc/mongod.conf

文件内容如下
可以看到::1 localhost 是 ipv6 的解析,使用 localhost 作为主机名的 mongodb://localhost:27017/moviedb
localhost 作为 MongoDB 数据库服务器的主机名时，会默认使用 IPv6 地址进行连接，而不是 IPv4 地址
把::1 localhost 这行删掉 就能连接成功(可能是没有 ipv6 地址 就会走 ipv4)
改了这个文件后一定要记得 `sudo killall -HUP mDNSResponder` 重新加载

```js
##

# Host Database

#

# localhost is used to configure the loopback interface

# when the system is booting. Do not change this entry.

##

127.0.0.1 localhost
255.255.255.255 broadcasthost
::1 localhost
```

## 本地 dns 解析

sudo nano /etc/hosts
需要刷新网络缓存以使更改生效。您可以执行以下命令：
sudo killall -HUP mDNSResponder
这将会清除本地 DNS 缓存并重新加载 Hosts 文件。

# 复习一下 linux 命令

netstat -tunlp |grep 80
ps aux | grep npm 查看当前 npm 命令对应进程
nohup npm run start &

lsof  -i :端口号
kill -9 PID

在终端加入环境路径
• 如果是 bash,执行 open ~/.bash_profile；如果是 zsh,执行 open ~/.zshrc
• 添加语句 PATH=$PATH:/usr/local/mysql/bin,保存
• 立即生效，source ~/.bash_profile or source ~/.zshrc

ps -ef | grep 详解

1. e 显示所有程序。
2. f 显示 UID,PPIP,C 与 STIME 栏位

UID |PID |PPID |C |STIME | TTY |TIME | CMD
zzw |14124 |13991 |0 |00:38 |pts/0 |00:00:00 | grep --color=auto dae

UID ：程序被该 UID 所拥有
PID ：就是这个程序的 ID
PPID：则是其上级父程序的 ID
C ：CPU 使用的资源百分比
STIME ：系统启动时间
TTY ：登入者的终端机位置
TIME：使用掉的 CPU 时间。
CMD：所下达的是什么指令

## mac 中安装 redis

使用 Homebrew 安装 Redis

1. 没有安装 Homebrew，首先安装 npm 国内的吧，快一些。
   打开终端输入以下命令：
   /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"

2. 使用 Homebrew 安装命令
   brew install redis

3. 查看安装及配置文件位置

Homebrew 安装的软件会默认在/usr/local/Cellar/路径下

redis 的配置文件 redis.conf 存放在/usr/local/etc 路径下

4. 启动 redis 服务

//方式一：使用 brew 帮助我们启动软件
brew services start redis
关闭软件
brew services stop redis
//方式二
redis-server /usr/local/etc/redis.conf

//执行以下命令
redis-server

5. 查看 redis 服务进程
   可以通过下面命令查看 redis 是否正在运行
   ps aux | grep redis

6. redis-cli 连接 redis 服务

redis 默认端口号 6379，默认 auth 为空，输入以下命令即可连接

redis-cli -h 127.0.0.1 -p 6379

7. 启动 redis 客户端，打开终端并输入命令 redis-cli。该命令会连接本地的 redis 服务。

$redis-cli
redis 127.0.0.1:6379>
redis 127.0.0.1:6379> PING
PONG

8. 关闭 redis 服务

正确停止 Redis 的方式应该是向 Redis 发送 SHUTDOWN 命令
redis-cli shutdown

强行终止 redis
sudo pkill redis-server

9. redis.conf 配置文件详解

redis 默认是前台启动，如果我们想以守护进程的方式运行（后台运行），可以在 redis.conf 中将 daemonize no,修改成 yes 即可。

## 注意

如果不知道配置文件在哪里，可以使用：
which redis.conf #或者
whereis redis.conf

我本机装在下面目录中了
/opt/homebrew/opt/redis/bin/redis-server /opt/homebrew/etc/redis.conf

## 使用

keys \* // 所有的 key

get "key" //获取 key

flushdb //清楚所有数据库
