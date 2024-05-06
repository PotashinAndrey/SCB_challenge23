import type { FastifyInstance } from 'fastify';
import type DB from '../class/DB';
import { dashboardsList, historyAppend, createDashboard, createProcess } from '../service/dashboards';
import type { DashboardCreateModel } from '@app/types/model/dashboard';

const dashboardApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  fastify.post('/list', () => dashboardsList(db));

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
    const { project = '', title = '', description = null, processes = [] } = request.body as DashboardCreateModel;
    console.log('dashboard create:\n\n', request.body, project, title, description, '\n\n');
    if (!project || !title) return {};

    const dashboard = await createDashboard(
      {
        project,
        title,
        description,
        processes: []
      },
      db
    );

    // (processes as string[]).forEach(async (column, index) => { // ProcessModelType
    //   await createProcess(dashboard.id, column, String(index), db);
    // });

    return dashboard;
  });

  done();
};

export default dashboardApi;
