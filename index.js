const Fastify = require('fastify');
const { setupDatabase } = require('./config/db.js');
const { userRoutes } = require('./routes/users.js');

const fastify = Fastify({
  logger: true,
});

setupDatabase(fastify);
userRoutes(fastify);

fastify.get('/health', async (request, reply) => {
  reply.type('application/json').code(200);
  return { status: 'ok', uptime: process.uptime() };
});

fastify.listen({ port: process.env.PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});
