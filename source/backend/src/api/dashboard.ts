import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { dashboardById } from "../service/dashboards";

const dashboardApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** @deprecated используйте processes/get Получение ВСЕХ данных для дашборда (процесса) */
  fastify.post("/get", async (request, reply) => {
    const { id = "" } = request.body ? JSON.parse(request.body as string) : {};
    if (!id) return {};
    return await dashboardById(id, db);
  });

  done();
}

export default dashboardApi;
