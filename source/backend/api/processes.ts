import type { UUID } from 'crypto';
import type { FastifyInstance } from 'fastify';
import type DB from '../class/DB';
import { dashboardsList, dashboardById, processByDashboardId, tasksByDashboardId, dashboardHistory } from '../service/dashboards';

const processesApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** Получение списка процессов (дашбордов) */
  fastify.post('/list', async (request, reply) => {
    const filter = request.body; //  ? JSON.parse(request.body as string) : {};
    const items = await dashboardsList(db);
    reply.code(200).send({ items });
  });

  /** Получение процесса (дашборда) */
  fastify.post('/get', async (request, reply) => {
    const { id } = request.body as { id: UUID };
    if (!id) throw new Error('Не передан ID процесса');

    const dashboard = await dashboardById(id, db);
    const processes = await processByDashboardId(id, db);
    const tasks = await tasksByDashboardId(id, db);

    // const history = await dashboardHistory(id, db);
    const response = { dashboard, processes, tasks };
    reply.code(200).send(response);
  });

  done();
};

export default processesApi;
