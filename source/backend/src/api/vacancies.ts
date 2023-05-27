import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { vacanciesList, createVacancy } from "../service/vacancies";
import { VacancyModel } from "@app/types/model/vacancy";

const vacanciesApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** Создание новой вакансии */
  fastify.post("/append", async (request, reply) => {
    try {
    const values: VacancyModel = JSON.parse(request.body as string);
    const items = await createVacancy(values, db);
    return { items };
    } catch (error) {
    //
    }
  });

  /** Получение списка вакансий */
  fastify.post("/list", async (request, reply) => {
    try {
    const filter = JSON.parse(request.body as string);
      const items = await vacanciesList(filter, db);
      return { items };
    } catch (error) {
      //
    }
  });
  done();
}

export default vacanciesApi;
