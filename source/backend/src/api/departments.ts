import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { departmentsList, departmentById } from "../service/departments";
import { DepartmentModel } from "@app/types/model/department";

const departmentsApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** Получение списка всех отделов */
  fastify.post("/list", async (request, reply) => {
    try {
    const filter = request.body ? JSON.parse(request.body as string) : {};
      const items = await departmentsList(filter, db);
      return { items };
    } catch (error) {
    }
  });

    /** Получение отдела по ИД */
    fastify.post("/get", async (request, reply) => {
        const data = JSON.parse(request.body as string);
        const items = await departmentById(data.id, db);
        return { items };
    });
  done();
}

export default departmentsApi;
