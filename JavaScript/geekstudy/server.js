const http = require('http');

let indexHtml = `<html ma=aaa >
    <header>
        <meta name="keywords" content="HTML, CSS, XML, XHTML" />
        <meta charset="utf8" />
        <style>
            h2 { color: red; }
            body { font-size: 14px; }
        </style>
        <title>title</title>
    </header>
    <body>
        code
        <h2>title</h2>
    </body>
</html>`
http.createServer((request, response) => {
    let body = [];
    request.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    })
    .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('body:', body);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(`${indexHtml}\n`);
    })
}).listen(8088);

console.log('server started');
