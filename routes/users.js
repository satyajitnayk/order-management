const userRoutes = (fastify) => {
  fastify.get('/users/:id', async (req, reply) => {
    try {
      const result = await fastify.pg.query(
        'SELECT "userId", name, email, "createdAt", "updatedAt" FROM "User" WHERE "userId" = $1',
        [req.params.id]
      );

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const { userId, name, email, createdAt, updatedAt } = user;
        reply.send({ userId, name, email, createdAt, updatedAt });
      } else {
        reply.send({ error: 'User not found' });
      }
    } catch (err) {
      reply.send(err);
    }
  });
};

module.exports = {userRoutes}
