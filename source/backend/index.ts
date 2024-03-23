import Fastify from 'fastify';
import * as url from 'url';
import type { BackendConfig } from '@app/types/config';
import FastifyCookie from '@fastify/cookie';
import config from '../../config';
import DB from './class/DB';
import cors from '@fastify/cors'

import usersApi from './src/api/users';
import companiesApi from './src/api/companies';
import projectsApi from './src/api/projects';
import processesApi from './src/api/processes';
import dashboardApi from './src/api/dashboard';
import tasksApi from './src/api/tasks';

const fastify = Fastify({ logger: true });
fastify.register(FastifyCookie);

const db = await new DB().connect();

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

fastify.addHook('preHandler', async (request, reply) => {
  reply.headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  });
});

// fastify.addHook('preValidation', (request, reply, done) => {
//   console.log('pre validation headers: ', request.headers);
//   // request.body = { ...request.body, importantKey: 'randomString' }
//   done();
// });

fastify.register(cors, {
  origin: '*', // Установите здесь домен вашего фронтенда
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
  allowedHeaders: ['Authorization', 'Content-Type'], // Разрешенные заголовки
  credentials: true, // Разрешить передачу куки и заголовков аутентификации
  exposedHeaders: ['X-Custom-Header'] // Заголовки, доступные для клиентского JavaScript кода
});

fastify.register(usersApi, { prefix: '/api/users', db });
fastify.register(companiesApi, { prefix: '/api/companies', db });
fastify.register(projectsApi, { prefix: '/api/projects', db });
fastify.register(processesApi, { prefix: '/api/processes', db });
fastify.register(dashboardApi, { prefix: '/api/dashboard', db });
fastify.register(tasksApi, { prefix: '/api/tasks', db });

const start = async () => {
  try {
    const __migrations = __dirname.replace(/\/?$/, '/migrations');
    await db.migrations(__migrations);
    await fastify.listen(
      (config as unknown as { backend: BackendConfig }).backend.http || {
        host: 'localhost',
        port: 8080
      }
    );
  } catch (error) {
    fastify.log.error(error);
    // console.error("Error: fastify.start", error);
    process.exit(1);
  }
};

const stop = async (signal: string, code: number = 0) => {
  try {
    await db.disconnect();
  } catch (dbCloseError) {
    console.log('Error DB: close', signal, dbCloseError);
  }
  try {
    await fastify.close();
  } catch (serverCloseError) {
    console.log('Error Fastify: close', signal, serverCloseError);
  }
  console.log('server stopped:', signal);
  process.exit(0);
};

start();

// Enable graceful stop
process.once('SIGINT', () => stop('SIGINT'));
process.once('SIGTERM', () => stop('SIGTERM'));
// process.on('uncaughtException', () => stop('uncaughtException', 1));
