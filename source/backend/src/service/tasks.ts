import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { VacancyListFilter, VacancyModel } from "@app/types/model/vacancy";
import { departmentById, departmentsList } from "./departments";
import { TaskModel } from "@app/types/model/task";

/** @deprecated - сделать через роутинг открытие дашборда */
export const tasksList = async (filter: VacancyListFilter, db: DB) => {
  let results = await db.select<TaskModel>({
    fields: '*',
    tables: 'flow.tasks'
  });

  return results;
};

export const createTask = (values: TaskModel, db: DB): Promise<UUID> => {
  const { dashboard, applicant } = values;
  return db.insertRow({
    fields: "dashboard, applicant",
    tables: "flow.tasks",
    values: [dashboard, applicant]
  });
};


// export const updateTask = (taskId: UUID, order: number, db: DB): Promise<any> => {
//   return db.updateFieldByID({
//     fields: "dashboard, applicant",
//     tables: "flow.tasks",
//   });
  //@ts-ignore
  // return new Promise("604419ba-4228-4127-b5dd-3cc78a9b34c3");
// };
//