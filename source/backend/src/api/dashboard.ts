import type { FastifyInstance } from "fastify";
import type DB from "../../class/DB";
import { dashboardById } from "../service/dashboards";
import { historyAppend } from "../service/candidates";
import { UUID } from "crypto";

const dashboardApi = (fastify: FastifyInstance, options: { db: DB }, done: () => void): void => {
    const { db } = options;

    /** @deprecated используйте processes/get Получение ВСЕХ данных для дашборда (процесса) */
    fastify.post("/get", async (request, reply) => {
        const { id = "" } = request.body ? JSON.parse(request.body as string) : {};
        if (!id) return {};
        return await dashboardById(id, db);
    });

    fastify.post("/history-append", async (request, reply) => {
        const { id = "", tasksId = "" } = request.body ? JSON.parse(request.body as string) : {};
        if (!id) return {};
        return await historyAppend(tasksId as UUID, id, db);
    })

    done();
}

export default dashboardApi;
