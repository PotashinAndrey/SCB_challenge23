import crypto from 'crypto';
import type { UUID } from 'crypto';
import pg from 'pg';
import type { QueryResult, QueryArrayResult, PoolClient, PoolConfig, QueryConfig } from 'pg';
import { promises as fs } from 'fs';
import type { RequestInsertDB, RequestUpdateDB, RequestSelectDB, RequestRelationDB, RequestUpdateFieldByID } from '@app/types/DB';
import config from '../../../config';
import SQL from './SQL';

const { Pool, Client } = pg;

class DB {
  config: PoolConfig;

  pool?: pg.Pool;
  client?: PoolClient;

  constructor() {
    this.config = config.database;
  }

  async select<T = any>(request: RequestSelectDB): Promise<Array<T>> {
    let text: string = SQL.requestSelect(request);
    const query = { text, values: request.values };
    const result = await this.query(query, request.client);
    return result.rows as Array<T>;
  }

  async selectArray<T = any>(request: RequestSelectDB): Promise<Array<Array<T>>> {
    let text: string = SQL.requestSelect(request);
    const query = { text, values: request.values, rowMode: 'array' };
    const result = await this.query(query, request.client);
    return result.rows as Array<Array<T>>;
  }

  selectRow<T = any>(request: RequestSelectDB): Promise<T> {
    return this.select(request).then((r) => r[0]);
  }

  insert(request: RequestInsertDB): Promise<any> {
    const query = {
      text: SQL.requestInsert(request),
      values: request.values // "text" in request ? undefined : [...(request.values || []), ...(request.conditionValues || [])]
    };
    return this.query(query, request.client);
  }

  insertRow<T extends {} = {}>(request: RequestInsertDB): Promise<T> {
    // todo: Omit<returning>
    return this.insert({ ...request, returning: '*' }).then((r) => r.rows[0]);
  }

  update(request: RequestUpdateDB): Promise<any> {
    const query = {
      text: SQL.requestUpdateById(request),
      values: request.values
    };
    return this.query(query, request.client).then((r) => r.rows[0]);
  }

  updateFieldByID<T extends {} = {}>(request: RequestUpdateFieldByID): Promise<T> {
    const query = {
      text: SQL.requestUpdateFieldByID(request),
      values: [request.value, request.id]
    };
    return this.query<T>(query, request.client).then((r) => r.rows[0]);
  }

  remove() {}

  removeByID() {}

  transaction() {}

  async createRelation(request: RequestRelationDB, client?: PoolClient | pg.Client): Promise<any> {
    // const sourceSplitIndex = request.source.lastIndexOf(".");
    // const sourceTable = request.source.substring(0, sourceSplitIndex).replace(".", '"."');
    // const sourceField = request.source.substring(sourceSplitIndex + 1);

    // const targetSplitIndex = request.target.lastIndexOf(".");
    // const targetTable = request.target.substring(0, targetSplitIndex).replace(".", '"."');
    // const targetField = request.target.substring(targetSplitIndex + 1);

    // const name = request.source + "_" + request.target;

    // const { name, sourceTable, sourceField, targetTable, targetField } = SQL.requestRelationParse(request);

    // const remove = SQL.removeRelation(request); // `alter table "${targetTable}" drop constraint if exists "${name}"`;

    await this.removeRelation(request, client);
    const text = SQL.createRelation(request); // `alter table "${targetTable}" add constraint "${name}" foreign key ("${targetField}") references "${sourceTable}" ("${sourceField}")`;
    return await this.query({ text }, client);
  }

  async removeRelation(request: RequestRelationDB, client?: PoolClient | pg.Client): Promise<any> {
    const text = SQL.removeRelation(request); // `alter table "${targetTable}" drop constraint if exists "${name}"`;
    return this.query({ text }, client);
  }

  createTable(name: string, primary: string, fields: Record<string, string>, client?: PoolClient) {
    const columns = Object.keys(fields).map((key) => {
      const [type, initial = 'NULL'] = fields[key].split(' ');
      const nullable = initial !== 'NULL' ? 'NOT NULL' : '';
      return [`"${key}"`, type, nullable, 'DEFAULT', initial].join(' ');
    });
    const text = `CREATE TABLE IF NOT EXISTS "${name.replace('.', '"."')}" (${columns.join(', ')}, PRIMARY KEY ("${primary}"))`;
    // console.log(text);
    return this.query({ text }, client);
  }

  createField(table: string, field: string, structure: string, client?: PoolClient | pg.Client): Promise<any> {
    const [type, initial = 'NULL'] = structure.split(' ');
    const nullable = initial !== 'NULL' ? 'NOT NULL' : '';
    const info = [`"${field}"`, type, nullable, 'DEFAULT', initial].join(' ');
    const text = `ALTER TABLE "${table.replace('.', '"."')}" ADD COLUMN IF NOT EXISTS ${info}`;
    return this.query({ text }, client);
  }

  removeField(table: string, field: string, client?: PoolClient | pg.Client): Promise<any> {
    const text = `ALTER TABLE "${table.replace('.', '"."')}" DROP COLUMN if exists "${field}"`;
    return this.query({ text }, client);
  }

  createSchema(name: string, client?: PoolClient) {
    const text = `create schema IF NOT EXISTS "${name}"`;
    return this.query({ text }, client);
  }

  createExtension(name: string, client?: PoolClient | pg.Client) {
    // DROP EXTENSION IF EXISTS "${name}";
    const text = `CREATE EXTENSION IF NOT EXISTS "${name}" WITH SCHEMA public`;
    return this.query({ text }, client);
  }

  async query<S extends {} = {}>(query: QueryConfig, client?: PoolClient | pg.Client): Promise<QueryResult<S>> {
    try {
      console.log('query', query, client)
      return client
        ? await client.query<S>(query)
        : await this.wrap<S>(client => client.query<S>(query));
    } catch (error) {
      console.log({ query });
      console.error('DB ERROR:', (error as Error).message);
      throw error;
    }
  }

  async createDatabase() {
    const { host, user, password, port } = this.config;
    const client = new Client({ host, user, password, port });

    try {
      await client.connect();
      await client.query('CREATE DATABASE ' + this.config.database);
      return true;
    } catch (error) {
      console.error('create DB Error inside', error);
      return false;
    } finally {
      await client.end();
    }
  }

  async initDatabase() {
    await this.query({
      text: `
      SET statement_timeout = 0;
      SET lock_timeout = 0;
      SET idle_in_transaction_session_timeout = 0;
      SET client_encoding = 'UTF8';
      SET standard_conforming_strings = on;
      SELECT pg_catalog.set_config('search_path', '', false);
      SET check_function_bodies = false;
      SET xmloption = content;
      SET client_min_messages = warning;
      SET row_security = off;
      SET default_tablespace = '';
      SET default_table_access_method = heap;
    `
    });
    await this.createExtension('uuid-ossp');
  }

  async connect(): Promise<DB> {
    this.pool = new Pool(config.database);

    this.pool.on('connect', (client) => console.log("DB POOL CONNECT"));
    this.pool.on('acquire', (client) => console.log("DB POOL acquire"));
    this.pool.on('remove', (client) => console.log("DB POOL remove"));

    this.pool.on('release', (err, client) => console.log("DB POOL release"));
    this.pool.on('error', (err, client) => console.log("DB POOL ERROR"));

    try {
      this.client = await this.pool!.connect();
      console.log('database connected', this.config.database);
    } catch (connectError) {
      console.error("DB", { connectError }); // DatabaseError // ?.["err"]?.["type"]
      console.error('database not exist', this.config.database);
      const createDatabase = await this.createDatabase();
      if (createDatabase) {
        this.client = await this.pool!.connect();
        await this.initDatabase();
      } else {
        throw new Error("can't init DB");
      }
    }
    return this;
  }

  async wrap<T extends {} = {}>(fn: (client: PoolClient, db: DB) => Promise<QueryResult<T>>) {
    const client = await this.pool!.connect();
    // console.log("DB WRAP", client);
    console.log("DB WRAP");
    try {
      const result = await fn(client, this);
      console.log("DB wrap result", result);
      return result;
    } catch (error) {
      console.log("DB wrap catch error", error)
      throw error;
    } finally {
      client.release();
    }
  }

  async migration(folder: string, index: number) {
    console.log('применяем миграцию', index);
    console.log(folder + '/' + index + '.js');
    const obj = await import('../migrations/' + index + '.js');
    const migration = obj.default;
    await this.wrap(migration);
    await this.insert({ fields: 'id', tables: 'public.migrations', values: [index] });
    console.log(`миграция ${index} применена`);
  }

  async migrations(folder: string) {
    const files = await fs.readdir(folder);
    const migrations = files
      .map((f) => parseInt(f.replace(/\.js$/, '')))
      .filter((f) => !Number.isNaN(f))
      .sort();
    console.log('все миграции', migrations);

    const migratedQuery: RequestSelectDB = { fields: 'id', tables: 'public.migrations' };
    let migrated = [];
    try {
      migrated = await this.selectArray<number>(migratedQuery);
    } catch (error) {
      // нет таблицы public.migrations
      await this.createTable('public.migrations', 'timestamp', {
        id: 'int4',
        timestamp: 'timestamp now()'
      });
      migrated = await this.selectArray<number>(migratedQuery);
    }
    const applied = migrated.map((row) => row[0]).sort();
    console.log('применённые миграции', applied);

    const rest = migrations.filter((f) => !applied.includes(f));
    // применение миграций
    for (let i = 0; i < rest.length; ++i) {
      await this.migration(folder, rest[i]);
    }
    console.log(rest.length > 0 ? 'все новые миграции применены' : 'не требуется применять миграции');
  }

  disconnect() {
    console.log("DB disconnect")
    return this.pool?.end();
  }

  static get uuid() {
    return crypto.randomUUID();
  }
}

export default DB;
