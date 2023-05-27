import { CandidateModel } from "@app/types/model/candidate";
import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { candidatesList, createCandidate, candidateByID } from "../service/candidates";

const candidatesApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** список соискателей (кандидатов) */
  fastify.post("/list", async (request, reply) => {
    try {
      const items = await candidatesList(db);
      return { items };
    } catch (error) {
      //
    }
  });

  fastify.post("/get", async (request, reply) => {
    try {
      const data = JSON.parse(request.body as string);
      const applicant = await candidateByID(data.id, db);//todo

      return applicant;
    } catch (error) {
      //
    }
  });

  fastify.post("/append", async (request, reply) => {
    try {
      const values = JSON.parse(request.body as string) as CandidateModel;
      const id = await createCandidate(values, db);
      return {
          ...values,
          id
      };
    } catch (error) {
      //
    }
  });

  done();
}

export default candidatesApi;
