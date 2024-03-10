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
  const { dashboard, process, title, description } = values;
  return db.insertRow({
    fields: 'dashboard, process, title, description',
    tables: 'flow.tasks',
    values: [dashboard, process, title, description],
  });
};

// export const updateTask = (values: TaskModel, db: DB): Promise<any> => {
//   const { dashboard, process, title, description } = values;
//   return db.updateFieldByID({
//     fields: 'dashboard, process, title, description',
//     table: 'flow.tasks',
//     values: [dashboard, process, title, description],
//   });
// };
