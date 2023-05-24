import Fastify from 'fastify';
import * as url from 'url';
import config from '../../../config';
import DB from "../class/DB";
import usersApi from "./api/users";

const fastify = Fastify({ logger: true })
const db = await new DB().connect();

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

fastify.addHook("preHandler", async (request, reply) => {
  reply.headers({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  });
});

fastify.register(usersApi, { prefix: "/api/users" });

fastify.get('/ping', async (request, reply) => {
  return 'pong\n';
});

const start = async () => {
  try {
    const __migrations = __dirname.replace(/\/src\/?$/, "/migrations");
    await db.migrations(__migrations);
    await fastify.listen(config.backend.http);
  } catch (error) {
    fastify.log.error(error);
    // console.error("Error: fastify.start", error);
    process.exit(1)
  }
};

const stop = async (signal: string, code: number = 0) => {
  try {
    await db.disconnect();
  } catch (dbCloseError) {
    console.log("Error DB: close", signal, dbCloseError);
  }
  try {
    await fastify.close();
  } catch (serverCloseError) {
    console.log("Error Fastify: close", signal, serverCloseError);
  }
  console.log("server stopped:", signal);
  process.exit(0);
}

start();

// Enable graceful stop
process.once('SIGINT', () => stop('SIGINT'));
process.once('SIGTERM', () => stop('SIGTERM'));
process.on('uncaughtException', () => stop('uncaughtException', 1));
