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
    await db.insert({
        fields: "id, department, name",
        values: ['f236cb65-63ef-4d32-bc96-0792dab66801', '6521d533-4973-413b-9376-c25ecb414941', 'Дашборд отдела разработки'],
        tables: "flow.dashboard"
    });
    // Номер шага. От меньшего к большему
    await db.createField("flow.step", "order", "int4 0", client); // email
    await db.insert({
        fields: "name, dashboard, order",
        values: ['Созвон с кандидатом', 'f236cb65-63ef-4d32-bc96-0792dab66801', 0],
        tables: "flow.step"
    });
    await db.insert({
        fields: "name, dashboard, order",
        values: ['Собеседование с HR', 'f236cb65-63ef-4d32-bc96-0792dab66801', 1],
        tables: "flow.step"
    });
    await db.insert({
        fields: "name, dashboard, order",
        values: ['Техническое собеседование', 'f236cb65-63ef-4d32-bc96-0792dab66801', 2],
        tables: "flow.step"
    });
    await db.insert({
        fields: "name, dashboard, order",
        values: ['Результаты', 'f236cb65-63ef-4d32-bc96-0792dab66801', 3],
        tables: "flow.step"
    });
 }