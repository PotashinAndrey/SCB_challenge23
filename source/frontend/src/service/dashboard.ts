import type { UUID } from 'crypto';
import type { DashboardModel, DashboardCreateModel } from '@app/types/model/dashboard';
import type { HistoryAppendModel } from '@app/types/model/history';
import api from '../scripts/api';

export const getDashboardsList = () => api<Array<DashboardModel>>('dashboard/list');

export const getDashboardById = (id: UUID) => api<DashboardModel, { id: UUID }>('dashboard/get', { id });

export const appendHistory = (values: HistoryAppendModel) => api('dashboard/history-append', values);

export const dashboardCreateRequest = (model: DashboardCreateModel) => api('dashboard/create', model);
