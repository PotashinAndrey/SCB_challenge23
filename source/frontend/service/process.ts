import type { UUID } from 'crypto';
import type { DashboardDataType } from "@app/types/model/dashboard";
import api from '../scripts/api';

// export const processesListLoad = (): Promise<{ items: Array<any> }> => api('processes/list');

export const dashboardLoad = (id: UUID): Promise<DashboardDataType> => api('processes/get', { id });
