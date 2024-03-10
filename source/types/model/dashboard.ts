import type { UUID } from 'node:crypto';

export type DashboardModel = {
  id?: UUID; // UUID
  name: string;
  project: UUID; // UUID
  removed?: boolean;
  description?: string;
};

export type DashboardCreateModel = Omit<DashboardModel, 'id' | 'removed'>;
