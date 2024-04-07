import type { UUID } from 'crypto';
import type { ProcessModelType } from '@app/types/model/process';
import type { TaskModel } from '@app/types/model/task';
import api from '../scripts/api';

// export const processesListLoad = (): Promise<{ items: Array<any> }> => api('processes/list');

export const dashboardLoad = (id: UUID): Promise<{
  dashboard?: any;
  processes?: Array<ProcessModelType>;
  tasks?: Array<TaskModel>;
}> => api('processes/get', { id });
