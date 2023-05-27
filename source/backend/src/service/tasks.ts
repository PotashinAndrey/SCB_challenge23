import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { VacancyListFilter, VacancyModel } from "@app/types/model/vacancy";
import { departmentById, departmentsList } from "./departments";
import { TaskModel } from "@app/types/model/task";

export const tasksList = async (filter: VacancyListFilter, db: DB) => {
  let results = await db.select<TaskModel>({
    fields: '*',
    tables: 'flow.tasks'
  });
  
  return results;
};

export const createTask = async (values: TaskModel, db: DB) => {
  const { dashboard, applicant } = values;
  return await db.insert({
      fields: "dashboard, applicant",
      tables: "flow.tasks",
      values: [dashboard, applicant],
      returning: "id"
  });
};
