import type { UUID } from 'node:crypto';

export type DashboardsModel = {
  id?: UUID; // UUID
  name: string;
  project: UUID; // UUID
  removed?: boolean;
};
