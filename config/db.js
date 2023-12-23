const fastifyPostgres = require('@fastify/postgres');
const dotenv = require('dotenv');

dotenv.config();

const setupDatabase = (fastify) => {
  fastify.register(fastifyPostgres, {
    connectionString: process.env.POSTGRES_CONNECTION_STRING,
    onConnect: async (client) => {
      fastify.log.info('Connected to PostgreSQL database');
    },
  })
    .after(() => {
      // This block will run after the plugin is registered
    })
    .addHook('onError', (request, reply, error, done) => {
      fastify.log.error(error.message);
      done();
    });
};

module.exports = {setupDatabase}
