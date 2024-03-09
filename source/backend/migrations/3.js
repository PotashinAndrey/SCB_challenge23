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
        fields: "id, project, name",
        values: ['f236cb65-63ef-4d32-bc96-0792dab66801', '6521d533-4973-413b-9376-c25ecb414941', 'Дашборд отдела разработки'],
        tables: "flow.dashboard",
        client
    });
 }
