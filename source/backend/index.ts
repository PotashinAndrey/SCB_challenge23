import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as url from 'url';
import type { BackendConfig } from '@app/types/config';
import FastifyCookie from '@fastify/cookie';
import config from '../../config';
import DB from './class/DB';
import cors from '@fastify/cors';

import usersApi from './src/api/users';
import companiesApi from './src/api/companies';
import projectsApi from './src/api/projects';
import processesApi from './src/api/processes';
import dashboardApi from './src/api/dashboard';
import tasksApi from './src/api/tasks';
import JWT from 'jsonwebtoken';

const { verify } = JWT;

const NOT_PROTECTED_PATHS = ['/api/users/login', '/api/users/register'];

const verifyJWT = (request: FastifyRequest, reply: FastifyReply, done) => {
  const { authToken } = request.cookies;
  if (!authToken) {
    reply.code(401);
    done(new Error('Unauthorized'));
  }
  try {
    const user = verify(authToken, process.env.SECRET);
    // TODO Можно тут же проверять на роль юзера
    // if (user.role === 'admin') {
    //   reply.code(403);
    //   done(new Error('Forbidden'));
    // }
    console.log('SUCCESS: Connected to protected route');
    done();
  } catch (verifyError) {
    // If error send Forbidden (403)
    console.log('ERROR: Could not connect to the protected route');
    reply.status(403);
    done(new Error('Cannot verify token'));
  }
};

const fastify: FastifyInstance = Fastify({ logger: true });

const db = await new DB().connect();

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

fastify.addHook('preHandler', (request, reply, done) => {
  reply.headers({
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Content-Type': 'application/json'
  });
  if (NOT_PROTECTED_PATHS.includes(request.routerPath)) {
    done();
  } else {
    verifyJWT(request, reply, done);
  }
});

fastify.register(FastifyCookie);
fastify.register(cors, {
  origin: 'http://localhost:8080', // Установите здесь домен вашего фронтенда
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
