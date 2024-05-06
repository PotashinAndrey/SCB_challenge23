/**
  * @typedef {import("pg").PoolClient} PoolClient
  * @typedef {import("../class/DB").default} DB
  */

/**
  * @param { PoolClient } client подключение к БД
  * @param { DB } db хелпер для работы с БД
  * @return { Promise<void> }
  */
export default async function migration(client, db) {
  // короткий код дашборда
  await db.createField("flow.dashboard", "code", "varchar(8)", client);

  // name => title
  await db.renameField("flow.dashboard", "name", "title", client);
}
