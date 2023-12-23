const { Kafka } = require('kafkajs');

const kafkaProducer = new Kafka({
  clientId: 'order-producer',
  brokers: [process.env.KAFKA_BROKER],
}).producer();

const kafkaConsumer = new Kafka({
  clientId: 'order-consumer',
  brokers: ['localhost:9093'],
}).consumer({ groupId: 'order-processing-group' });

const initializeKafka = async () => {
  await kafkaProducer.connect();
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topic: 'order-queue-topic', fromBeginning: true });
};

const produceOrder = async (order) => {
  await kafkaProducer.send({
    topic: 'order-queue-topic',
    messages: [{ value: JSON.stringify(order) }],
  });
};

const consumeOrders = async (processOrderCallback) => {
  await kafkaConsumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());
      await processOrderCallback(order);
    },
  });
};

module.exports = {
  initializeKafka,
  produceOrder,
  consumeOrders,
};
