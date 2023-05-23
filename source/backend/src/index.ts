import fastify from 'fastify';

import DB from "../class/DB";

const server = fastify()
const db = new DB();

server.get('/ping', async (request, reply) => {
  // await db.databaseCreate("test");
  return 'pong\n';
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});
