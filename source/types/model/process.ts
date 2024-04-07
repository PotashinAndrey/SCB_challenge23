import type { UUID } from 'crypto';

export type ProcessCardModelType = {
  id: UUID | string;
  name: string;
  process: string;
};

export type ProcessModelType = {
  id: UUID;
  name: string;
  order: number;
  action?: string;
  process_description?: string;
};

export type ProcessProps = { process: ProcessModelType };
