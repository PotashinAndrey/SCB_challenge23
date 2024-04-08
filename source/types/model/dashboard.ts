import type { UUID } from 'crypto';
import type { ProcessModelType } from './process';
import type { TaskModel } from './task';

export type DashboardModel = {
  id?: UUID; // UUID
  name: string;
  project: UUID; // UUID
  removed?: boolean;
  description?: string;
};

export type DashboardDataType = {
  dashboard: DashboardModel;
  processes?: Array<ProcessModelType>;
  tasks?: Array<TaskModel>;
}

export type DashboardCreateModel = Omit<DashboardModel, 'id' | 'removed'>;
