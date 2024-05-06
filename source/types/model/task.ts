import type { UUID } from 'crypto';

export type TaskModel = {
  id?: UUID; // UUID
  process: UUID;
  dashboard: UUID;
  removed?: boolean;
  title: string;
  description: string;// | undefined;
};

export type TaskProps = {
  task: TaskModel;
};

export type TaskCreateFormValues = Pick<TaskModel, "title" | "description" | "process">;
