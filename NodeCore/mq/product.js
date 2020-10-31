var amqplib = require('amqplib');

async function productDefault() {
    // 1. 创建连接
    let connection = await amqplib.connect('amqp://localhost:5672');
    // 2. 获取通道
    let channel = await connection.createChannel();
    // 3. 生产消息
    let routingKey = 'helloHaHa';
    let msg = 'product msg';
    for (let i = 0; i < 10000; i++) {
        await channel.publish('', routingKey, Buffer.from(`发送第${i}条消息.`));
    }
    await channel.close();
    await connection.close();
}

async function productFanout() {
    let connection = await amqplib.connect('amqp://localhost:5672');
    let channel = await connection.createChannel();

    let exchangeName = 'fanout_exchange_name';
    let routingKey = '';
    let msg = 'hello';

    await channel.assertExchange(exchangeName, 'fanout', { durable: true });
    for (let i = 0; i < 10000; i++) {
        channel.publish(exchangeName, routingKey, Buffer.from(`${msg} 第${i}条信息.`));
    }
    await channel.close();
    await connection.close();
}

productFanout()