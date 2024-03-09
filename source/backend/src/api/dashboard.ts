import type { FastifyInstance } from 'fastify';
import type DB from '../../class/DB';
import { dashboardsList, historyAppend } from '../service/dashboards';
import { UUID } from 'crypto';

const dashboardApi = (
  fastify: FastifyInstance,
  options: { db: DB },
  done: () => void
): void => {
  const { db } = options;

  fastify.post('/list', async (request, reply) => {
    return await dashboardsList(db);
  });

  fastify.post('/history-append', async (request, reply) => {
    const { columnId = '', taskId = '' } = request.body
      ? JSON.parse(request.body as string)
      : {};
    console.log('\n\n ', request.body, columnId, taskId, '\n\n');
    if (!columnId || !taskId) return {};
    return await historyAppend(taskId as UUID, columnId, db);
  });

  done();
};

export default dashboardApi;
