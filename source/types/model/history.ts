import type { UUID } from 'crypto';

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
