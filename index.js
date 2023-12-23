const { setupDatabase } = require('./config/db.js');
const { userRoutes } = require('./routes/users.js');
const { kafka } = require('./config');
const {checkPayment} = require("./config/payment");
const {createShipment} = require("./services/shipment");

const fastify = require('fastify')({
  logger: true,
});

async function runServer() {
  try {
    setupDatabase(fastify);
    userRoutes(fastify);

    // Initialize Kafka
    await kafka.initializeKafka();

    // consume orders
    await kafka.consumeOrders(async (order) => {
      const shipment = await createShipment(order)
      console.log(shipment)
    })

    fastify.get('/health', async (request, reply) => {
      reply.type('application/json').code(200);
      return { status: 'ok', uptime: process.uptime() };
    });

    fastify.post('/orders', async (request, reply) => {
      try {
        const order = request.body;
        const {orderId= "1234", txnId= "BEY23DD2"} = order;
        const isPaymentSuccess = await checkPayment({orderId,txnId})
        if(isPaymentSuccess) {
          await kafka.produceOrder(order);
          reply.send({ success:true, message: `order with orderId ${orderId} placed successfully` });
        } else {
          reply.status(400).send({success:false, message: "payment failed"});
        }
      } catch (error) {
        reply.status(500).send({ message: 'Error producing order' });
      }
    });

    // Use await or return a promise for the listen operation
    await fastify.listen({ port: process.env.PORT });
    console.log(`Server listening on ${fastify.server.address().port}`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

runServer();
