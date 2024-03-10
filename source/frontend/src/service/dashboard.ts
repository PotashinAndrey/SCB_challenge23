import { UUID } from 'crypto';
import api from '../scripts/api';
import { DashboardModel } from '@app/types/model/dashboard';

export const getDashboardsList = (): Promise<any> => {
  return api('dashboard/list');
};

export const getDashboardById = (id: UUID): Promise<DashboardModel> => {
  return api('dashboard/get', { id });
};

export const appendHistory = ({
  taskId,
  columnId,
  dashboardId,
}: {
  taskId: string;
  columnId: UUID;
  dashboardId: UUID;
}): Promise<any> => {
  return api('dashboard/history-append', { taskId, columnId, dashboardId });
};

export const createDashboardRequest = (projectId: UUID, name: string, description?: string, columns?: string[]): Promise<UUID> => {
  return api('dashboard/create', { project: projectId, name, description, columns });
};
