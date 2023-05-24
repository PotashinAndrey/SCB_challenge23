import type { PoolClient, Client } from "pg";

export type BaseDBRequestClient = { client?: PoolClient | Client }
export type BaseQueryValues = { values?: Array<any> } // string | number
export type TextQueryType = { text: string }

export type BaseQueryType = {
  fields: string;
  tables: string;
};

export type RequestSelectDB = BaseDBRequestClient & BaseQueryValues & (BaseQueryType | TextQueryType);
export type RequestInsertDB = RequestSelectDB & { returnID?: boolean }

export type RequestRelationDB = {
  source: `${string}.${string}` | `${string}.${string}.${string}`;
  target: `${string}.${string}` | `${string}.${string}.${string}`;
}
