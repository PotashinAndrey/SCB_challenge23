import pg from "pg";
import config from '../../../config';

const { Client } = pg;

export default class DB {
  client: pg.Client;

  constructor() {
    const client = new Client(config.database);
    this.client = client;
  }


}
