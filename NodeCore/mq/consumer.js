var amqplib = require('amqplib');

async function consumeDefault () {
    let connection = await amqplib.connect('amqp://localhost:5672');
    let channel = await connection.createChannel();

    let queueName = 'helloHaHa';
    await channel.assertQueue(queueName);
    await channel.consume(queueName, msg => {
        console.log(`Consume: ${msg.content.toString()}`)
        channel.ack(msg)
    })
}

async function consumeFanout() {
    let connection = await amqplib.connect('amqp://localhost:5672');
    let channel = await connection.createChannel()
    let exchangeName = 'fanout_exchange_name';
    let queueName = 'hello';
    let routingKey = '';

    await channel.assertExchange(exchangeName, 'fanout', {durable: true});
    await channel.assertQueue(queueName, exchangeName, routingKey);

    await channel.consume(queueName, (msg) => {
        console.log(`Consume: `, `${msg.content.toString()}`);
        channel.ack(msg);
    })
}
consumeFanout();