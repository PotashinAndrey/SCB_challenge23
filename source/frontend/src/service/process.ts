import type { BoardColumnModelType } from '@app/types/model/board';
import type { UUID } from 'crypto';
import api from '../scripts/api';

export const processesListLoad = (): Promise<{ items: Array<any> }> => api('processes/list');

export const dashboardLoad = (id: UUID): Promise<{
  dashboard?: any;
  processes?: Array<BoardColumnModelType>;
  tasks?: Array<any>;
}> => {
  return api('processes/get', { id });
};
