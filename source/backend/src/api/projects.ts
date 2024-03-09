import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { projectsList, projectById } from "../service/projects";

const projectsApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** Получение списка всех отделов */
  fastify.post("/list", async (request, reply) => {
    try {
    const filter = request.body ? JSON.parse(request.body as string) : {};
      const items = await projectsList(filter, db);
      return { items };
    } catch (error) {
    }
  });

    /** Получение отдела по ИД */
    fastify.post("/get", async (request, reply) => {
        const data = JSON.parse(request.body as string);
        const items = await projectById(data.id, db);
        return { items };
    });
  done();
}

export default projectsApi;
