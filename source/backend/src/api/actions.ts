import type { FastifyInstance } from 'fastify';
import type DB from '../../class/DB';
import { actionsList } from '../service/dashboards';

const actionsApi = (
  fastify: FastifyInstance,
  options: { db: DB },
  done: () => void
): void => {
  const { db } = options;

  /** Получение списка ВСЕХ экшенов (дашбордов) */
  fastify.post('/list', async (request, reply) => {
    const filter = request.body ? JSON.parse(request.body as string) : {};
    const items = await actionsList(db);
    return { items };
  });

  done();
};

export default actionsApi;
