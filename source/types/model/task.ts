import type { UUID } from 'node:crypto';

export type TaskModel = {
  id?: UUID; // UUID
  process: UUID;
  dashboard: UUID;
  removed?: boolean;
  title: string;
  description?: string;
};
