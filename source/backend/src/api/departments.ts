import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { departmentsList } from "../service/departments";
import { DepartmentModel } from "@app/types/model/department";

const departmentsApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** Получение списка всех компаний */
  fastify.post("/list", async (request, reply) => {
    try {
    const filter = request.body ? JSON.parse(request.body as string) : {};
      const items = await departmentsList(filter, db);
      return { items };
    } catch (error) {
    }
  });
  done();
}

export default departmentsApi;
