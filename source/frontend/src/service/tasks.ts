import { UUID } from "crypto";
import api from "../scripts/api";

export const taskUpdateState = (taskId: UUID, order: number): Promise<any> => {
  return api("tasks/list", { taskId, order });
}