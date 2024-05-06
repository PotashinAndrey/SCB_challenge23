import type { UUID } from 'crypto';
import type { ProcessModelType } from './process';
import type { TaskModel } from './task';

export type DashboardModel = {
  id?: UUID;
  removed?: boolean;
  project?: UUID;

  title: string;
  description: string; // | undefined;
  processes: Array<ProcessModelType>; // | undefined;
};

export type DashboardDataType = {
  dashboard: DashboardModel;
  processes?: Array<ProcessModelType>;
  tasks?: Array<TaskModel>;
}

export type DashboardCreateModel = Omit<DashboardModel, 'id' | 'removed'>;
