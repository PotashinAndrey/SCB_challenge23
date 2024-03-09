// import type { ProcessModel } from "@app/types/model/process";
import { UUID } from 'crypto';
import api from '../scripts/api';

export const processesListLoad = (): Promise<{ items: Array<any> }> => {
  return api('processes/list');
};

export const dashboardLoad = (id: UUID): Promise<any> => {
  return api('processes/get', { id });
};
