import type { UUID } from 'crypto';
import type { DashboardModel } from '@app/types/model/dashboard';
import type { HistoryAppendModel } from '@app/types/model/history';
import api from '../scripts/api';

export const getDashboardsList = () => api<Array<DashboardModel>>('dashboard/list');

export const getDashboardById = (id: UUID) => api<DashboardModel, { id: UUID }>('dashboard/get', { id });

export const appendHistory = (values: HistoryAppendModel): Promise<any> => {
  return api('dashboard/history-append', values);
};

export const createDashboardRequest = (projectId: UUID, name: string, description?: string, columns?: string[]): Promise<UUID> => {
  return api('dashboard/create', { project: projectId, name, description, columns });
};
