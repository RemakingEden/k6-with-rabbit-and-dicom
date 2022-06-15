let express = require('express');
let router = express.Router();
let { AMQPClient } = require('@cloudamqp/amqp-client');
let config = require('../config/config');

async function run() {
  try {
    const amqp = new AMQPClient("amqp://" + config.rabbit.ip)
    const conn = await amqp.connect()
    const ch = await conn.channel()
    const q = await ch.queue()
    const consumer = await q.subscribe({noAck: true}, async (msg) => {
      console.log(msg.bodyToString())
      await consumer.cancel()
    })
    await q.publish("Hello World", {deliveryMode: 2})
    await consumer.wait() // will block until consumer is canceled or throw an error if server closed channel/connection
    await conn.close()
  } catch (e) {
    console.error("ERROR", e)
    e.connection.close()
    setTimeout(run, 1000) // will try to reconnect in 1s
  }
}


/* Send Rabbit Message. */
router.get('/', function(req, res, next) {
  run().then(() => {
    res.status(200).send("Passed");
  });
});

module.exports = router;
