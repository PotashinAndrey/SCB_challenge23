import type { FastifyInstance } from 'fastify';
import type DB from '../../class/DB';
import { stepsList, stepById } from '../service/dashboards';

const stepsApi = (
  fastify: FastifyInstance,
  options: { db: DB },
  done: () => void
): void => {
  const { db } = options;

  /** Получение списка ВСЕХ шагов (дашбордов) */
  fastify.post('/list', async (request, reply) => {
    const filter = request.body ? JSON.parse(request.body as string) : {};
    const items = await stepsList(db);
    return { items };
  });

  /** Получение шага по id дашборда (дашбордов) */
  fastify.post('/get', async (request, reply) => {
    const { id = '' } = request.body ? JSON.parse(request.body as string) : {};
    if (!id) return {};
    return await stepById(id, db);
  });

  done();
};

export default stepsApi;
