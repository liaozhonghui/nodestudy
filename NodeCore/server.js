/**
 * Created by myPC on 2018/3/17.
 */
var net = require('net');
var port=8080;
var server = net.createServer(function(socket){
    console.log('connect:'+ socket.remoteAddress + ':'+socket.remotePort);
    socket.setEncoding('binary');
    socket.on('data',function(data){
        console.log('from client:'+data);
    });
    socket.write('Hello client\r\n');
    socket.on('error',function(exception){
        console.log('socket error:' + exception);
        socket.end();
    });

    socket.on('close',function(){
        console.log('client closed!');
    });
}).listen(port);
server.on('error',function(execption){
    console.log("server error:" + exception);
});
server.on('listening',function(){
    console.log('server listening'+server.address().port);
});
