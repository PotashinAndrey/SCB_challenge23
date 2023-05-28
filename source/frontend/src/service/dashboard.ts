import { UUID } from "crypto";
import api from "../scripts/api";

export const getDashboardById = (id: UUID): Promise<any> => {
    return api("dashboard/get", { id });
}

export const appendHistory = ({ taskId, columnId, dashboardId }: {taskId: string, columnId: UUID, dashboardId: UUID}): Promise<any> => {
    return api("dashboard/history-append", { taskId, columnId, dashboardId });
}
