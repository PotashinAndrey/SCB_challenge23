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
  // Компании, которые пользуются услугами подбора
  await db.createTable("company.companies", "id", {
    id: "uuid public.uuid_generate_v4()",
    name: "text",
    description: "text",
    removed: "bool false"
  }, client);
  await db.insert({
    fields: "id, name, description",
    tables: "company.companies",
    values: ['97c2e591-28b9-4916-be9b-6cbb630f8fe9', 'Совкомбанк', 'Российский частный универсальный коммерческий банк с головным офисом в Костроме']
  });
  // Добавляем к отделу ссылку на компанию
  await db.createField("company.projects", "company", "uuid", client);
  await db.createRelation({
    source: "company.companies.id",
    target: "company.projects.company"
  }, client);
  // Добавляем к кандидату ссылку на вакансию по которой он пришел
  await db.createField("service.applicants", "vacancy", "uuid", client);
  await db.createRelation({
    source: "company.vacancies.id",
    target: "service.applicants.vacancy"
  }, client);
  // Добавляем сотруднику ссылку на департамент в котором он работает
  await db.createField("company.employes", "project", "uuid", client);
  await db.createRelation({
    source: "company.projects.id",
    target: "company.employes.project"
  }, client);
  // Добавляем департаменты в компанию
  await db.insert({
    fields: "id, name, company",
    tables: "company.projects",
    values: ['6521d533-4973-413b-9376-c25ecb414941', 'Разработка', '97c2e591-28b9-4916-be9b-6cbb630f8fe9']
  });
  await db.insert({
    fields: "id, name, company",
    tables: "company.projects",
    values: ['5fdf07f0-8f44-4e5f-9d6a-f9b3ac92b407', 'Тестирование', '97c2e591-28b9-4916-be9b-6cbb630f8fe9']
  });
  await db.insert({
    fields: "id, name, company",
    tables: "company.projects",
    values: ['53e8cb11-3256-4447-8f5c-04c0b5c7ed0d', 'Отдел кадров', '97c2e591-28b9-4916-be9b-6cbb630f8fe9']
  });
  // Добавляем работников
  await db.insert({
    fields: "id, name, project",
    tables: "company.employes",
    values: ['36a535ac-ef40-4b03-b851-fe97b61b6179', 'Ринат Ибрагимыч', '6521d533-4973-413b-9376-c25ecb414941']
  });
  await db.insert({
    fields: "id, name, project",
    tables: "company.employes",
    values: ['907d5be0-0e74-4daf-b08f-0f0a652d5304', 'Илья Утлякич', '6521d533-4973-413b-9376-c25ecb414941']
  });
  await db.insert({
    fields: "id, name, project",
    tables: "company.employes",
    values: ['22d4d332-698e-430a-9942-d5c9f696deaa', 'Андрей Поташич', '5fdf07f0-8f44-4e5f-9d6a-f9b3ac92b407']
  });
  await db.insert({
    fields: "id, name, project",
    tables: "company.employes",
    values: ['59218edb-ddf1-4454-ab8e-bf481140f1df', 'Влада На', '53e8cb11-3256-4447-8f5c-04c0b5c7ed0d']
  });
}
