import type { UUID } from 'crypto';

export type BoardCardModelType = {
  id: UUID | string;
  name: string;
  process: string;
};

export type BoardColumnModelType = {
  id: UUID;
  name: string;
  order: number;
  action?: string;
  process_description?: string;
};
