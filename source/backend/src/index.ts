import fastify from 'fastify';
import * as url from 'url';
import DB from "../class/DB";

const server = fastify()
const db = new DB();

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

server.get('/ping', async (request, reply) => {
  console.log(123, "__dirname", __dirname);
  // await db.databaseCreate("test");
  // await db.migrations(__dirname.replace(/))
  return 'pong\n';
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});
