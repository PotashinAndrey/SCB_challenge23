import type { TaskModel } from '@app/types/model/task';
import api from '../scripts/api';

export const taskCreate = (values: TaskModel): Promise<any> => {
  return api('tasks/create', values);
};

export const taskUpdate = (values: TaskModel): Promise<any> => {
  return api('tasks/update', values);
};
