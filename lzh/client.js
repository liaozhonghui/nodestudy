/**
 * Created by myPC on 2018/3/17.
 */
var net = require('net');
var port = 8080;
var host = '127.0.0.1';
var client = new net.Socket();
client.setEncoding('binary');
client.connect(port,host,function(){
    client.write('hello,server!');
});
client.on('data',function(data){
    console.log('from server:'+data);
});
client.on('error',function(error){
    console.log('error:'+error);
});
client.on('close',function(){
    console.log('Connection closed!');
});