import type { PoolClient, Client } from 'pg';
import type { UUID } from 'crypto';

export type BaseDBRequestClient = { client?: PoolClient | Client };
export type BaseQueryValues = { values?: Array<any> }; // string | number
export type TextQueryType = { text: string };

// export type BaseOrderByAscType = { asc?: string };
// export type BaseOrderByDescType = { desc?: string };
export type BaseOrderByType = { order?: string | `${string} asc` | `${string} desc` };

// const t: BaseOrderByType = { asc: "a", desc: "b" };

export type BaseQueryType = {
  fields: string;
  tables: string;
  where?: string;
};

export type RequestSelectDB = BaseDBRequestClient & BaseQueryValues & ((BaseQueryType & BaseOrderByType) | TextQueryType);
export type RequestInsertDB = BaseDBRequestClient & BaseQueryValues & ((BaseQueryType & { returning?: string }) | TextQueryType);

export type RequestUpdateFieldByID = BaseDBRequestClient & {
  id: UUID;
  table: string;
  field: string;
  value: any;
};
export type RequestUpdateDB<T = any> = BaseDBRequestClient & {
  table: string;
  fields: string;
  id: UUID;
  where?: string;
  values?: any[];
};

export type RequestRelationDB = {
  source: `${string}.${string}` | `${string}.${string}.${string}`;
  target: `${string}.${string}` | `${string}.${string}.${string}`;
};
