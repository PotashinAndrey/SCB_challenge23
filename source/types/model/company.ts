import type { UUID } from 'crypto';

export type CompanyModel = {
  id?: UUID;
  name: string;
  description: string;
};
