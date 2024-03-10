import type { FastifyInstance } from 'fastify';
import type DB from '../../class/DB';
import { createTask } from '../service/tasks';

const tasksApi = (
  fastify: FastifyInstance,
  options: { db: DB },
  done: () => void
): void => {
  const { db } = options;

  fastify.post('/create', async (request, reply) => {
    const values = JSON.parse(request.body as string);
    const response = await createTask(values, db);
    return { id: response };
  });

  // fastify.post('/update', async (request, reply) => {
  //   const values = JSON.parse(request.body as string);
  //   const response = await updateTask(values, db);
  //   return response;
  // });
  done();
};

export default tasksApi;
