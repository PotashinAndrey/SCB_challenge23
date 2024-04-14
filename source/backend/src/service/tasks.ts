import type { UUID } from 'crypto';
import type DB from '../../class/DB';
import type { TaskModel } from '@app/types/model/task';

/** @deprecated - сделать через роутинг открытие дашборда */
export const tasksList = async (filter: any, db: DB) => {
  let results = await db.select<TaskModel>({
    fields: '*',
    tables: 'flow.tasks'
  });

  return results;
};

export const createTask = async (values: TaskModel, db: DB): Promise<TaskModel> => {
  const { dashboard, process, title, description } = values;
  const task = await db.insertRow<TaskModel>({
    fields: 'dashboard, process, title, description',
    tables: 'flow.tasks',
    values: [dashboard, process, title, description]
  });
  return { ...task };
};

export const updateTask = (item: TaskModel, db: DB): Promise<TaskModel> => {
  const { id, dashboard, process, title, description, removed } = item;
  return db.update({
    id,
    fields: 'dashboard, process, title, description, removed',
    table: 'flow.tasks',
    values: [dashboard, process, title, description, removed]
  });
};
