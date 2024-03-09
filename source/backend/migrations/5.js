/**
  * @typedef {import("pg").PoolClient} PoolClient
  * @typedef {import("../class/DB").default} DB
  */

/**
  * @param {PoolClient} client подключение к БД
  * @param { DB } db хелпер для работы с БД
  * @return {Promise<void>}
  */
export default async function migration(client, db) {

  // история перемещений тасок по дашборду (from -> to id колонок процесса)
  await db.createTable("flow.history", "id", {
    id: "uuid public.uuid_generate_v4()",
    timestamp: "timestamp now()",
    task: "uuid",
    from: "uuid",
    to: "uuid",
  }, client);

  db.createRelation({
    source: "flow.tasks.id",
    target: "flow.history.task"
  });

  db.createRelation({
    source: "flow.process.id",
    target: "flow.history.from"
  });

  db.createRelation({ // ?
    source: "flow.process.id",
    target: "flow.history.to"
  });

}
