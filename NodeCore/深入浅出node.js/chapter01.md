# chapter01 Node.js简介
javascript 选型
v8 高性能， 符合事件驱动， 没有历史包袱

chrome沙箱结构
html, js => webkit, v8 => 中间层 => 网卡，硬盘，显卡...
node.js沙箱结构
js => v8 => 中间层（libuv) => 网卡，硬盘

## Node 的特点
异步io: 从语言层面进行并行io操作， 异步Io如何提效率和本身的机制和实现?
```js
// 前端
$.post('/url', {title: 'node.js'}, function (data) {
    console.log('接收到响应')
});
console.log('other logic');
// 后端读取文件
var fs = require('fs');
fs.readFile('/path', function(err, file) {
    console.log('接收文件完成');
});
console.log('do other logic');
```

事件和回调函数: 异步流程控制和事件写作的方法和技巧
```js 
// 前端ajax事件
$.ajax({
    url: '/url',
    method: 'post',
    data: {},
    success: function(data) {
        // success 事件
    }
})
// 后端http事件
var http = require('http');
var querystring = require('querystring');

http.createServer(function (chunk) {
    var postData = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        postData += chunk;
    });
    req.on('end', function() {
        res.send(postData);
    })
}).listen(8080);
console.log('服务器启动完成.')
```

单线程： 如何享受无忧无虑的单线程编程，又能高效利用资源呢？
单线程的优点：不需要进行共享状态，没有死锁的存在，也没有线程上下文切换所带来的性能上的开销。
单线程的缺点：1. 无法利用多核cpu, 2. 错误计算会引起整个应用退出，应用的健壮性值得考验，3. 大量计算占用cpu导致无法继续调用异步I/O
chrome解决js的单线程问题，使用web workers，通过消息传递的方式来传递运行结果。
node.js解决js的单线程问题：child_process, 通过master-worker的管理方式管理各个工作进程。

跨平台：libuv

## Node的应用场景
I/O密集型
node面向网络并且擅长并行I/O, 能够有效的组织起来更多的硬件资源，从而提供更多更好的服务。
cpu密集型应用nodejs如何进行解决： 1. 使用c/c++拓展的方式高效利用cpu, 2. 使用多线程的方式，对于node.js而言，使用多进程的方式，将计算任务放置到子进程中。将计算和I/O分离

分布式应用
并行调用I/O资源， 如分布式读取多台mysql机器的数据库数据

## Node的使用者
前后端编程环境统一
Node带来的高性能I/O用实时应用(socket.io)
并行I/O, 有效利用稳定接口提升web渲染能力
云计算平台提供Node支持
游戏开发领域 pomelo实时框架，实时和并发
工具类应用
