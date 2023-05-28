import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { dashboardsList, dashboardById, processByDashboardId, tasksList, dashboardHistory } from "../service/dashboards";

const processesApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** Получение списка процессов (дашбордов) */
  fastify.post("/list", async (request, reply) => {
    const filter = request.body ? JSON.parse(request.body as string) : {};
    const items = await dashboardsList(db);
    return { items };
  });

  /** Получение процесса (дашборда) */
  fastify.post("/get", async (request, reply) => {
    const { id = "" } = request.body ? JSON.parse(request.body as string) : {};
    if (!id) return {};
    const dashboard = await dashboardById(id, db);
    const steps = await processByDashboardId(id, db);
    const tasks = await tasksList(id, db);
    const history = await dashboardHistory(id, db);
    return { dashboard, steps, tasks, history }
  });

  done();
}

export default processesApi;
