const Fastify = require('fastify');
const { setupDatabase } = require('../config/db.js')

describe('Database Setup', () => {
  let fastify;

  beforeAll(() => {
    fastify = Fastify();
    setupDatabase(fastify);
  });

  afterAll(() => {
    fastify.close();
  });

  test('Should connect to the PostgreSQL database', async () => {
    // Perform assertions or use a mocking library to ensure database connection is successful
    // You may want to use a separate test database or mocks for testing database interactions
  });
});
