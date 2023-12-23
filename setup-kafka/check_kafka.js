const { Kafka } = require('kafkajs');

// Define your Kafka broker(s)
const kafkaBrokers = ['localhost:9093']; // Update with your Kafka broker(s) information

// Create a Kafka instance
const kafka = new Kafka({
  clientId: 'kafka-test-client',
  brokers: kafkaBrokers,
});

// Create a Kafka producer
const producer = kafka.producer();

// Create a Kafka consumer
const consumer = kafka.consumer({ groupId: 'kafka-test-group' });

// Function to produce a test message
async function produceMessage() {
  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: 'Hello, Kafka!' }],
  });
  await producer.disconnect();
}

// Function to consume messages
async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(`Received message: ${message.value}`);
    },
  });

  // Uncomment the following line if you want to stop the consumer after a certain period
  // setTimeout(async () => await consumer.disconnect(), 5000);
}

// Run the test
async function runTest() {
  try {
    await produceMessage();
    await consumeMessages();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Uncomment the following line if you want to stop the producer after the test
    // await producer.disconnect();
  }
}

// Run the test
runTest();
