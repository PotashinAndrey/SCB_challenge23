import Fastify from 'fastify';
import * as url from 'url';
import type { BackendConfig } from "@app/types/config";
import config from '../../config';
import DB from "./class/DB";

import usersApi from "./src/api/users";
import calendarApi from "./src/api/calendar";

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

fastify.register(usersApi, { prefix: "/api/users", db });
fastify.register(calendarApi, { prefix: "/api/calendar", db });

const start = async () => {
  try {
    const __migrations = __dirname.replace(/\/?$/, "/migrations");
    await db.migrations(__migrations);
    await fastify.listen((config as unknown as {backend: BackendConfig}).backend.http || {host: "localhost", port: 8080});
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
// process.on('uncaughtException', () => stop('uncaughtException', 1));
