import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { eventCreate, eventsList } from "../service/calendar";
import { CalendarEventModel } from "@app/types/model/calendar";

const calendarApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
  const { db } = options;

  /** регистрация пользователя */
  fastify.post("/list", async (request, reply) => {
    try {
      const items = await eventsList(db);
      return { items };
    } catch (error) {
      //
    }
  });

  /** авторизация пользователя */
  fastify.post("/append", async (request, reply) => {
    console.log("/append", request.body);
    const eventData = JSON.parse(request.body as string) as CalendarEventModel;
    const id = await eventCreate(eventData, db);
    return {
        ...eventData,
        id
    };
  });

  done();
}

export default calendarApi;
