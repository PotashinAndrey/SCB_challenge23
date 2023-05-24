import pg from "pg";
import crypto from "node:crypto";
import { promises as fs } from "fs";
import config from '../../../config';

const { Pool } = pg;

export default class DB {
  pool: pg.Pool;

  constructor() {
    const pool = new Pool(config.database);
    this.pool = pool;
  }

  async wrap(fn: (client: pg.PoolClient) => Promise<any>) {
    const client = await this.pool.connect();
    try {
      const result = await fn(client);
      return result;
    } catch (error) {
      console.log("DB ERROR:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  select(text: string, values: Array<any> = [], client?: pg.PoolClient) {
    const query = { text, values };
    return client
      ? client.query(query)
      : this.wrap(client => client.query(query));
  }

  selectArray(text: string, values: Array<any> = [], client?: pg.PoolClient) {
    const query = { text, values, rowMode: 'array' };
    return client
      ? client.query(query)
      : this.wrap(client => client.query(query));
  }

  selectByID() {

  }

  insert() {

  }

  insertByID() {

  }

  update() {

  }

  updateByID() {

  }

  remove() {

  }

  removeByID() {

  }

  transaction() {

  }

  createTable() {

  }

  migration() {

  }

  async migrations(folder: string) {
    const files = await fs.readdir(folder);
    const migrations = files
      .map(f => parseInt(f.replace(/\.js$/, "")))
      .filter(f => !Number.isNaN(f))
      .sort();

    console.log("все миграции", migrations);

    let applied = await this.selectArray("select id from public.migrations");
    console.log("applied");
    // applied = list.rows.map(e => parseInt(e)).sort();
  }

  static get uuid() {
    return crypto.randomUUID();
  }
}
