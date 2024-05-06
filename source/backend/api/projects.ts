import type { UUID } from 'crypto';
import type { FastifyInstance } from 'fastify';
import type { ProjectModel } from '@app/types/model/project';
import type DB from '../class/DB';
import { projectsList, projectById, projectCreate } from '../service/projects';

const projectsApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** Получение списка всех отделов */
  fastify.post('/list', async (request, reply) => {
    try {
      const filter = request.body; //  ? JSON.parse(request.body as string) : {};
      const items = await projectsList(filter, db);
      reply.code(200).send({ items });
    } catch (error) {
      // ...
    }
  });

  /** Получение отдела по ИД */
  fastify.post('/get', async (request, reply) => {
    const { id } = request.body as { id: UUID }; // JSON.parse(request.body as string);
    const items = await projectById(id, db);
    reply.code(200).send({ items });
  });

  fastify.post('/create', async (request, reply) => {
    const data = request.body as ProjectModel; // JSON.parse(request.body as string);
    const response = await projectCreate(data, db);
    reply.code(200).send(response);
  });

  done();
};

export default projectsApi;
