import type { UUID } from 'node:crypto';

export type HistoryModel = {
  id: UUID;
  task: UUID;
  from: UUID;
  to: UUID;
};

export type HistoryAppendModel = {
  taskId: UUID;
  oldColumnId: UUID;
  newColumnId: UUID;
};
