import type { UUID } from 'crypto';

export type ProjectModel = {
  id: UUID; // UUID
  company: UUID; // UUID
  name: string;
};
