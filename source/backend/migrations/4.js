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

  await db.createField("flow.dashboard", "description", "text", client);

  // таблица (many-many) для связи дашбордов и списка шагов
  await db.createTable("flow.process", "id", {
    id: "uuid public.uuid_generate_v4()",
    dashboard: "uuid",
    name: "text",
    order: "int4", // nullable!
    description: "text",
    created: "timestamp now()",
    removed: "bool false"
  }, client);

  await db.createRelation({
    source: "flow.process.id",
    target: "flow.tasks.process"
  }, client);

  await db.createRelation({
    source: "flow.dashboard.id",
    target: "flow.tasks.dashboard"
  }, client);

  await db.createRelation({
    source: "flow.dashboard.id",
    target: "flow.process.dashboard"
  }, client);

  // создаем дашборд
  const { id } = await db.insertRow({
    fields: "project, name, description",
    values: ['6521d533-4973-413b-9376-c25ecb414941', "найм разработчиков в ЛК", "процесс найма разработчиков (frontend, backend, mobile) в продукт ЛК"],
    tables: "flow.dashboard",
    client
  });

  // создаем список шагов в дашборде
  await db.insertRow({
    fields: "dashboard, name, order",
    values: [id, "к выполнению", 0],
    tables: "flow.process",
    client
  });

  await db.insertRow({
    fields: "dashboard, name, order",
    values: [id, "в работе", 1],
    tables: "flow.process",
    client
  });

  await db.insertRow({
    fields: "dashboard, name, order",
    values: [id, "ревью", 2],
    tables: "flow.process",
    client
  });

  await db.insertRow({
    fields: "dashboard, name, order",
    values: [id, "тестирование", 3],
    tables: "flow.process",
    client
  });

  await db.insertRow({
    fields: "dashboard, name, order",
    values: [id, "готово", 4],
    tables: "flow.process",
    client
  });
}
