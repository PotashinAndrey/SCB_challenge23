import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { applicantsList } from "../service/applicants";

const applicantsApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** список соискателей (кандидатов) */
  fastify.post("/list", async (request, reply) => {
    try {
      const items = await applicantsList(db);
      return { items };
    } catch (error) {
      //
    }
  });

  done();
}

export default applicantsApi;
