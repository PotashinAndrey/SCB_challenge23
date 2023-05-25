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
    // События в календаре
    await db.createTable("flow.calendar_events", "id", {
      id: "uuid public.uuid_generate_v4()", // ид
      task: "uuid", // Таск к которому относится запись
      employee: "uuid", // Кто проводит событие
      status: "uuid", // Статус события
      author: "uuid", // Кто создал событие
      type: "uuid", // Тип события
      name: "text", // Название события
      timestamp: "timestamp", // Время события
      description: "text", // Описание события
      removed: "bool false"
    }, client);

    // Типы событий в календаре
    await db.createTable("flow.calendar_types", "id", {
      id: "uuid public.uuid_generate_v4()", // ид
      name: "text", // Название типа события
      description: "text", // Описание типа события
      removed: "bool false"
    }, client);

    // Статусы событий в календаре
    await db.createTable("flow.calendar_status", "id", {
      id: "uuid public.uuid_generate_v4()", // ид
      name: "text", // Название статуса события
      description: "text", // Описание статуса события
      removed: "bool false"
    }, client);

    await db.createRelation({
      source: "flow.tasks.id",
      target: "flow.calendar_events.task"
    }, client);

    await db.createRelation({
      source: "service.users.id",
      target: "flow.calendar_events.author"
    }, client);

    await db.createRelation({
      source: "company.employes.id",
      target: "flow.calendar_events.employee"
    }, client);

    await db.createRelation({
      source: "flow.calendar_status.id",
      target: "flow.calendar_events.status"
    }, client);

    await db.createRelation({
      source: "flow.calendar_types.id",
      target: "flow.calendar_events.type"
    }, client);

    await db.insert({
      fields: "id, name, description",
      tables: "flow.calendar_types",
      values: ['27fbec34-86e5-48f0-bdef-783df11f6a5f', 'Предварительный прозвон', '']
    });

    await db.insert({
      fields: "id, name, description",
      tables: "flow.calendar_types",
      values: ['6186b117-ddb8-40eb-ac81-746c2cb3cb01', 'Заполнение анкеты', '']
    });

    await db.insert({
      fields: "id, name, description",
      tables: "flow.calendar_types",
      values: ['37f1a346-7745-4e00-9ebf-38ce293d59b9', 'Собеседование с HR', 'Отбор, оценка резюме и первое впечвтление. Очень важно понять, вольётся ли кандидат в коллектив']
    });

    await db.insert({
      fields: "id, name, description",
      tables: "flow.calendar_types",
      values: ['1b8ddd15-5c4d-4aee-8c52-007ba142fc32', 'Техническое собеседование', 'На этом этапе проверяют знания, умения и навыки кандидата']
    });

    await db.insert({
      fields: "id, name, description",
      tables: "flow.calendar_types",
      values: ['978e87c4-f682-4712-ade4-a467532c5178', 'Встреча с руководителем направления/проекта', 'На этом этапе выявляют уровень soft skills кандидата. Это один из самых сложных этапов, потому что объективно измерить уровень гибких навыков человека сложно. Основная часть вопросов строится вокруг информации из резюме, особое внимание уделяется предыдущим местам работы.']
    });

    await db.insert({
      fields: "id, name, description",
      tables: "flow.calendar_status",
      values: ['f3afa072-7aba-4bd4-a882-232e7cbb1367', 'Назначено', 'Событие назначено']
    });

    await db.insert({
      fields: "id, name, description",
      tables: "flow.calendar_status",
      values: ['934cf0a4-4e91-42f7-b09c-3b45654fa6c0', 'Проведено', 'Событие проведено']
    });
}
