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
    await db.createRelation({
      source: "company.departments.id",
      target: "company.vacancies.department"
    }, client);
    await db.insert({
        fields: "department, name, description",
        values: ['6521d533-4973-413b-9376-c25ecb414941', 'Senior developer', 'Ищем ведущего разработчика!!'],
        tables: "company.vacancies",
        client
    });
    await db.insert({
        fields: "department, name, description",
        values: ['5fdf07f0-8f44-4e5f-9d6a-f9b3ac92b407', 'QA senior engineer', 'Ищем ведущего тестировщика!'],
        tables: "company.vacancies",
        client
    });
    await db.insert({
        fields: "department, name, description",
        values: ['53e8cb11-3256-4447-8f5c-04c0b5c7ed0d', 'Lead HR', 'Ищем ведущего менджера по подбору персонала!'],
        tables: "company.vacancies",
        client
    });
    await db.createField("service.applicants", "email", "text", client); // email
    await db.createField("service.applicants", "phone", "text", client); // телефон
    await db.createField("service.applicants", "vk", "text", client); // vk
    await db.createField("service.applicants", "notes", "text", client); // заметка

    // Добавляем признак того, что скилл является тегом
    await db.createField("service.skills", "tag", "bool false", client); // заметка
 }
