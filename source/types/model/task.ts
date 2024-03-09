import type { UUID } from 'node:crypto';

export type TaskModel = {
  id?: UUID; // UUID
  dashboard: UUID;
  removed?: boolean;
};
