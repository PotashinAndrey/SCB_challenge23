import type DB from '../../class/DB';
import type { UUID } from 'node:crypto';
import { TaskModel } from '@app/types/model/task';

/** @deprecated - сделать через роутинг открытие дашборда */
export const tasksList = async (filter: any, db: DB) => {
  let results = await db.select<TaskModel>({
    fields: '*',
    tables: 'flow.tasks',
  });

  return results;
};

export const createTask = (values: TaskModel, db: DB): Promise<UUID> => {
  const { dashboard } = values;
  return db.insertRow({
    fields: 'dashboard',
    tables: 'flow.tasks',
    values: [dashboard],
  });
};

// export const updateTask = (taskId: UUID, order: number, db: DB): Promise<any> => {
//   return db.updateFieldByID({
//     fields: "dashboard",
//     tables: "flow.tasks",
//   });
//@ts-ignore
// return new Promise("604419ba-4228-4127-b5dd-3cc78a9b34c3");
// };
//
