import type { UUID } from 'node:crypto';

export type CompanyModel = {
  id?: UUID;
  name: string;
  description: string;
};
