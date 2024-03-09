import type { UUID } from 'node:crypto';

export type TaskModel = {
  id?: UUID; // UUID
  process: UUID;
  removed?: boolean;
};
