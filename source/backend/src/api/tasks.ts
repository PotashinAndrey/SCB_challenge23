import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
// import { updateTask } from "../service/tasks";

const tasksApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
    const { db } = options;

    // fastify.post("/update", async (request, reply) => {
    //     const { taskId, order } = JSON.parse(request.body as string);
    //     const items = await updateTask(taskId, order, db);
    //     return { items };
    // });
    done();
}

export default tasksApi;
