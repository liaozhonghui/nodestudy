## 浏览器工作原理

浏览器的5个步骤
1. url => HTTP
2. HTML => parse
3. Dom => css computing
4. Dom with css => layout
5. Dom with position => render
6. Bitmap

### 有限状态机处理字符串
- 每个状态都是一个机器
- 每个机器中都可以进行计算、存储、输出
- 所有的这些机器接受的输入都是一致的
- 每个机器知道下一个状态
- 每个机器都有确定的下一个状态 （moore状态机器）
- 每个机器根据输入决定下一个状态 （Mealy状态机)

实现mealy型的状态机
```js
// 定义
function state(input) {
    return next;
}
// 调用
while(input) {
    state = state(input);
}
```

```js
/** 
 * 匹配ab
 * 匹配abcabx
 * 匹配abababx
*/
function match(str) {
    let state = start;
    for (let c of str) {
        state = state(c);
    }
    return false;
}
function start (c) {
    if (c === 'a') return foundA;
    else return start;
}
function foundA(c) {
    if (c === 'b') return foundB;
    else return start(c);
}
function foundB(c) {
    if (c === 'b') return foundC;
    else return start(c);
}
function foundC(c) {
    if (c === 'b') return end;
    else return start(c);
}
function end(c) {
    return end;
}
```

http-server:
```js
const http = require('http');

http.createServer((request, response) => {
    let body = [];
    request.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        body = Buffer.concat(body).toString();
        console.log('body:', body);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('Hello World\n');
    })
}).listen(8088);

console.log('server started');
```

### HTTP协议， 文本型协议，全部理解为字符串
Request格式：
POST / HTTP/1.1
Host: 127.0.0.1
Content-Type: application/x-www-form-urlencoded

field=aaa&code=x%3D1

Reponse格式：
HTTP/1.1 200 OK
Content-Type: text/html
Date: Mon, 23 Dec 2019
Connection: keep-alive
Transfer-Encoding:chunked
空行
26（16进制的数字）
body 题
0 （16进制的0）
```js
// 实现一个http请求
void async function() {
    let request = new Request({

    });
    let response = await request.send();
    console.log(response)
}
class Request{
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {}; 
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (this.headers['Content-Type'] === 'application/json')
            this.bodyText = JSON.stringify(this.body);
        else if(this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=encodeURIComponent(this.body[key]`).join('&');
        }
        this.headers['Content-Length'] = this.bodyText.length
    }
    send (connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;
            if (connection) { 
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());
                })
            }
            connection.on('data', (data) => {
                console.log(data.toString());
                parser.receive(data.toString());
                if (parser.isFinished) {
                    resolve(parser.response);
                    connection.end()
                }
            })
            connection.on('error', (err) => {
                reject(err);
                connection.end();
            })
        })
    }
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }
}
class ResponseParser {
    constructor () {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_lINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEAD_BLOCK_END = 6;
        this.WAITING_BODY = 7;
        
        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
    }
    receive(string) {
        for (let i = 0; i < string.length; i++){
            this.receiveChar(string.charAt()); 
        }
    }
    receiveChar(char) {
        if (this.current === 0) {
            if (char === '\r') this.current = 1;
            else this.statusLine += char;
        } else if(this.current === 1) {
            if (char === '\n') this.current = 2;
        } else if (this.current === 2) {
            if (char === ':') {
                this.current = 3;
            } else if(char === '\r') {
                this.current = 6;
            } else {
                this.headeName += char;
            }
        } else if (this.current === 3) {
            if (char === ' ') this.current = 4; 
        } else if (this.current === 4) {
            if (char === '\r') {
                this.current = 5;
                this.headers[this.headerName] = this.headerValue;
                this.headerName = "";
                this.headerValue = "";
            } else {
                this.headerValue += char;
            }
        } else if (this.current == 5) {
            if (char === '\n') this.current = 2;
        } else if (this.current === 6) {
            if (char === '\n') this.current = 7;
        } else if (this.current  === 7) {
            console.log(char);
        }
    }
}
```
