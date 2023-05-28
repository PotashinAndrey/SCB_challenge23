import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { dashboardsList, dashboardById } from "../service/dashboards";

const processesApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** Получение списка процессов (дашбордов) */
  fastify.post("/list", async (request, reply) => {
    const filter = request.body ? JSON.parse(request.body as string) : {};
    const items = await dashboardsList(db);
    return { items };
  });

  /** Получение списка процессов (дашбордов) */
  fastify.post("/get", async (request, reply) => {
    const { id = "" } = request.body ? JSON.parse(request.body as string) : {};
    if (!id) return {};
    return await dashboardById(id, db);
  });

  done();
}

export default processesApi;
