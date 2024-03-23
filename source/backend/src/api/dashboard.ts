import type { FastifyInstance } from 'fastify';
import type DB from '../../class/DB';
import { dashboardsList, historyAppend, createDashboard, createProcess } from '../service/dashboards';

const dashboardApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  fastify.post('/list', async (request, reply) => {
    return await dashboardsList(db);
  });

  fastify.post('/history-append', async (request, reply) => {
    const { taskId = '', oldColumnId = '', newColumnId = '' } = request.body ? JSON.parse(request.body as string) : {};
    if (!newColumnId || !taskId) return {};
    return await historyAppend(
      {
        taskId,
        oldColumnId,
        newColumnId
      },
      db
    );
  });

  fastify.post('/create', async (request, reply) => {
    const { project = '', name = '', description = null, columns = [] } = request.body ? JSON.parse(request.body as string) : {};
    console.log('\n\n ', request.body, project, name, description, '\n\n');
    if (!project || !name) return {};

    const dashboard = await createDashboard(
      {
        project,
        name,
        description
      },
      db
    );

    (columns as string[]).forEach(async (column, index) => {
      await createProcess(dashboard.id, column, String(index), db);
    });

    return dashboard;
  });

  done();
};

export default dashboardApi;
