import type { FastifyInstance } from 'fastify';
import type { TaskModel } from '@app/types/model/task';
import type DB from '../class/DB';
import { createTask, updateTask } from '../service/tasks';

const tasksApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  fastify.post('/create', async (request, reply) => {
    const value = request.body as TaskModel;
    const response = await createTask(value, db);
    reply.code(200).send(response);
  });

  fastify.post('/update', async (request, reply) => {
    const value = request.body as TaskModel;
    const response = await updateTask(value, db);
    reply.code(200).send(response);
  });
  done();
};

export default tasksApi;
