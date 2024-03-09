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

  // действие, которое надо совершить на столбике дашборда
  await db.createTable("flow.actions", "id", {
    id: "uuid public.uuid_generate_v4()",
    name: "text",
    description: "text",
    kind: "text", // calendar | exercise | internal - событие в календаре или тестовое или внутреннее для компании или ?
    type: "text", // questionnaire | call | interview | task | check - анкета / звонок / собес / задание / какая-то проверка / ?
    created: "timestamp now()",
    required: "bool true", // обязательное
    removed: "bool false"
  }, client);

  // базовые действия
  const interview = await db.insertRow({
    fields: "name, kind, type, required, description",
    values: ['Собеседование', 'calendar', "interview", true, "общение с канидатом лично или по видеосвязи"],
    tables: "flow.actions",
    client
  });

  const homework = await db.insertRow({
    fields: "name, kind, type, required, description",
    values: ['Тестовое задание', 'exercise', "task", true, "кандидату отправляется тестовое задание, которое он должен выполнить в течение трех дней"],
    tables: "flow.actions",
    client
  });

  const safeguard = await db.insertRow({
    fields: "name, kind, type, required, description",
    values: ['Проверка СБ', 'internal', "check", true, "проверка кандидата службой безопасности перед наймом на работу"],
    tables: "flow.actions",
    client
  });

  // увы, нужна связь many - many (идея в том что в steps будут лежать все возможные шаги)
  await db.removeRelation({
    source: "flow.dashboard.id",
    target: "flow.step.dashboard"
  }, client);

  // номер шага будет в связи между дашбордом и всеми шагами
  await db.removeField("flow.step", "order", client);
  await db.removeField("flow.step", "dashboard", client);

  //
  await db.createField("flow.dashboard", "description", "text", client);

  await db.createField("flow.step", "description", "text", client);
  await db.createField("flow.step", "action", "uuid", client);

  // связь между шагами и действием внутри них
  await db.createRelation({
    source: "flow.actions.id",
    target: "flow.step.action"
  }, client);

  // таблица (many-many) для связи дашбордов и списка шагов
  await db.createTable("flow.process", "id", {
    id: "uuid public.uuid_generate_v4()",
    dashboard: "uuid",
    step: "uuid",
    order: "int4", // nullable!
    description: "text",
    created: "timestamp now()",
    removed: "bool false"
  }, client);

  await db.createRelation({
    source: "flow.dashboard.id",
    target: "flow.process.dashboard"
  }, client);

    await db.createRelation({
    source: "flow.step.id",
    target: "flow.process.step"
  }, client);

  // создаем базовые шаги
  const prepareStep = await db.insertRow({
    fields: "name, description",
    values: ['Подготовка', 'Реакция на отклик, связь с кандидатом'],
    tables: "flow.step",
    client
  });

  const interviewHRStep = await db.insertRow({
    fields: "name, description",
    values: ['Собеседование с HR', 'Собеседование кандидата с представителем отдела кадров'],
    tables: "flow.step",
    client
  });

  const homeworkStep = await db.insertRow({
    fields: "name, description, action",
    values: ['Тестовое задание', 'Отправка ТЗ и его проверка', homework], // вешаем экшен на шаг процесса (на колонку)
    tables: "flow.step",
    client
  });

  const interviewTechStep = await db.insertRow({
    fields: "name, description",
    values: ['Техническое собеседование', 'Собеседование кандидата с т техлидом команды разработки'],
    tables: "flow.step",
    client
  });

  const hiringStep = await db.insertRow({
    fields: "name, description, action",
    values: ['Выход на работу', 'Подготовка кандидата к выходу на работу', safeguard], // вешаем экшен на шаг процесса (на колонку)
    tables: "flow.step",
    client
  });

  // ID шагов из предыдущей миграции - навесим им действия
  // const interviewHRStep = 'f236cb65-63ef-4d32-bc96-0792dab66801';
  // await db.updateFieldByID({
  //   table: "flow.step",
  //   field: "action",
  //   value: interview,
  //   id: interviewHRStep,
  //   client
  // });

  // const interviewTechStep = 'f236cb65-63ef-4d32-bc96-0792dab66801';
  // await db.updateFieldByID({
  //   table: "flow.step",
  //   field: "action",
  //   value: interview,
  //   id: interviewTechStep,
  //   client
  // });

  // создаем дашборд
  const developersFlow = await db.insertRow({
    fields: "project, name, description",
    values: ['6521d533-4973-413b-9376-c25ecb414941', "найм разработчиков в ЛК", "процесс найма разработчиков (frontend, backend, mobile) в продукт ЛК"],
    tables: "flow.dashboard",
    client
  });

  // создаем список шагов в дашборде
  await db.insertRow({
    fields: "dashboard, step, order",
    values: [developersFlow, prepareStep, 0],
    tables: "flow.process",
    client
  });

  await db.insertRow({
    fields: "dashboard, step, order",
    values: [developersFlow, interviewHRStep, 1],
    tables: "flow.process",
    client
  });

  await db.insertRow({
    fields: "dashboard, step, order",
    values: [developersFlow, homeworkStep, 2],
    tables: "flow.process",
    client
  });

  await db.insertRow({
    fields: "dashboard, step, order",
    values: [developersFlow, interviewTechStep, 3],
    tables: "flow.process",
    client
  });

  await db.insertRow({
    fields: "dashboard, step, order",
    values: [developersFlow, hiringStep, 4],
    tables: "flow.process",
    client
  });
}
