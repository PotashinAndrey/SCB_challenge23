import type { UUID } from 'crypto';

export type DashboardsModel = {
  id?: UUID; // UUID
  name: string;
  project: UUID; // UUID
  removed?: boolean;
};
