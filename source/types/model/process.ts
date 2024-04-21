import type { UUID } from 'crypto';

export type ProcessCardModelType = {
  id: UUID;
  name: string;
  process: string;
};

export type ProcessModelType = {
  id: UUID;
  title: string;
  order?: number;
  description?: string;

  action?: string;
};

export type ProcessProps = { process: ProcessModelType };
