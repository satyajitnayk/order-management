const Fastify = require('fastify');
const { setupDatabase } = require('../config/db.js');
const { userRoutes } = require('../routes/users.js');

describe('User Routes', () => {
  let fastify;

  beforeAll(() => {
    fastify = Fastify();
    setupDatabase(fastify);
    userRoutes(fastify);
  });

  afterAll(() => {
    fastify.close();
  });

  test('GET /users/:id should return user details', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/users/1',
    });

    expect(response.statusCode).toBe(200);
    const jsonResponse = response.json()
    // Check if required properties exist
    expect(jsonResponse).toHaveProperty('userId');
    expect(jsonResponse).toHaveProperty('name');
    expect(jsonResponse).toHaveProperty('email');
    expect(jsonResponse).toHaveProperty('createdAt');
    expect(jsonResponse).toHaveProperty('updatedAt');
  });

  test('GET /users/:id should handle user not found', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/users/999',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ error: 'User not found' });
  });
});
