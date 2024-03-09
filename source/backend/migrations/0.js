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
  // сервис HR
  await db.createSchema("service", client);

  // роли в сервисе (права доступа)
  await db.createTable("service.roles", "id", {
    id: "uuid public.uuid_generate_v4()",
    name: "text",
    created: "timestamp now()",
    removed: "bool false"
  }, client);

  // пользователи сервиса (не обязательно совпадает с сотрудниками компании)
  await db.createTable("service.users", "id", {
    id: "uuid public.uuid_generate_v4()",
    name: "text",
    password: "text",
    created: "timestamp now()",
    removed: "bool false",
    online: "bool false"
  }, client);

  // роли пользователей
  await db.createTable("service.user_role", "id", {
    id: "uuid public.uuid_generate_v4()",
    user: "uuid",
    role: "uuid",
    removed: "bool false"
  }, client);

  await db.createRelation({
    source: "service.users.id",
    target: "service.user_role.user"
  }, client);

  await db.createRelation({
    source: "service.roles.id",
    target: "service.user_role.role"
  }, client);

  // компания
  await db.createSchema("company", client);

  // сотрудники компании
  await db.createTable("company.employes", "id", {
    id: "uuid public.uuid_generate_v4()",
    name: "text",
    removed: "bool false"
  }, client);

  // отделы компании
  await db.createTable("company.projects", "id", {
    id: "uuid public.uuid_generate_v4()",
    name: "text",
    removed: "bool false"
  }, client);

  // кто где работает
  await db.createTable("company.structure", "id", {
    id: "uuid public.uuid_generate_v4()",
    employee: "uuid",
    project: "uuid",
    removed: "bool false"
  }, client);

  await db.createRelation({
    source: "company.employes.id",
    target: "company.structure.employee"
  }, client);

  await db.createRelation({
    source: "company.projects.id",
    target: "company.structure.project"
  }, client);

  // процессы
  await db.createSchema("flow", client);

  // процессы
  await db.createTable("flow.dashboard", "id", {
    id: "uuid public.uuid_generate_v4()",
    name: "text",
    project: "uuid",
    removed: "bool false"
  }, client);

  // шаги процесса
  await db.createTable("flow.step", "id", {
    id: "uuid public.uuid_generate_v4()",
    name: "text",
    dashboard: "uuid",
    removed: "bool false"
  }, client);

  await db.createRelation({
    source: "flow.dashboard.id",
    target: "flow.step.dashboard"
  }, client);

  // таски в процессе (перемещение карточки соискателя по флоу найма сотрудника)
  await db.createTable("flow.tasks", "id", {
    id: "uuid public.uuid_generate_v4()",
    dashboard: "uuid",
    removed: "bool false"
    // status, step?
  }, client);

  await db.createRelation({
    source: "flow.dashboard.id",
    target: "flow.tasks.dashboard"
  }, client);
}
