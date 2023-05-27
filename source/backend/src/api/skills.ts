import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { skillsList } from "../service/skills";

const skillsApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** Список скиллов */
  fastify.post("/list", async (request, reply) => {
    const items = await skillsList(db);
    return { items };
  });
  done();
}

export default skillsApi;
