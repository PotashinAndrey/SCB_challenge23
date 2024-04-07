import type { UUID } from 'crypto';
import type { Explain } from '@app/types/utils';

export type TaskModel = {
  id?: UUID; // UUID
  process: UUID;
  dashboard: UUID;
  removed?: boolean;
  title: string;
  description?: string;
};

export type TaskProps = {
  task: TaskModel;
};

export type TaskCreateFormValues = Explain<Pick<TaskModel, "title" | "description" | "process">>;
