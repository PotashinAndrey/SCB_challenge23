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
  // список скилов (навыков)
  await db.createTable("service.skills", "id", {
    id: "uuid public.uuid_generate_v4()",
    name: "text",
    description: "text",
    type: "text 'soft'", // значения - soft / hard / мб еще какие-то
    // level: "int4 0",   // уровень... неважно, но пусть будет число
    removed: "bool false"
  }, client);

  // заполняем список скиллов
  const marketingSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Маркетинг"], returning: "id" }).then(r => r.rows[0].id);
  const socialiseSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Коммуникабельность"], returning: "id" }).then(r => r.rows[0].id);
  const frontendSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Frontend"], returning: "id" }).then(r => r.rows[0].id);
  const backendSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Backend"], returning: "id" }).then(r => r.rows[0].id);
  const reactJSSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["React JS"], returning: "id" }).then(r => r.rows[0].id);
  const effectorSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Effector"], returning: "id" }).then(r => r.rows[0].id);
  const nodeJSSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Node JS"], returning: "id" }).then(r => r.rows[0].id);
  const postgresSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Postgre SQL"], returning: "id" }).then(r => r.rows[0].id);
  const javascriptSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["javascript"], returning: "id" }).then(r => r.rows[0].id);
  const typescriptSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["typescript"], returning: "id" }).then(r => r.rows[0].id);
  const gitSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["GIT"], returning: "id" }).then(r => r.rows[0].id);
  const englishSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Английский язык"], returning: "id" }).then(r => r.rows[0].id);
  const photoshopSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Photoshop"], returning: "id" }).then(r => r.rows[0].id);
  const figmaSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Figma"], returning: "id" }).then(r => r.rows[0].id);
  const oneCSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["1C"], returning: "id" }).then(r => r.rows[0].id);
  const antdSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Antd"], returning: "id" }).then(r => r.rows[0].id);
  const swiftSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Swift"], returning: "id" }).then(r => r.rows[0].id);
  const swiftUISkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Swift UI"], returning: "id" }).then(r => r.rows[0].id);
  const vueSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Vue JS"], returning: "id" }).then(r => r.rows[0].id);
  const kotlinSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Kotlin"], returning: "id" }).then(r => r.rows[0].id);
  const cppSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["C++"], returning: "id" }).then(r => r.rows[0].id);
  const csharpSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["C#"], returning: "id" }).then(r => r.rows[0].id);
  const dotnetSkill = await db.insert({ fields: "name", tables: "service.skills", values: [".NET"], returning: "id" }).then(r => r.rows[0].id);
  const jetpackSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Jetpack Compose"], returning: "id" }).then(r => r.rows[0].id);
  const mlSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["ML"], returning: "id" }).then(r => r.rows[0].id);
  const nlpSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["NLP"], returning: "id" }).then(r => r.rows[0].id);
  const specificationSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Написание ТЗ"], returning: "id" }).then(r => r.rows[0].id);
  const documentationSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Документирование"], returning: "id" }).then(r => r.rows[0].id);
  const pythonSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Python"], returning: "id" }).then(r => r.rows[0].id);
  const qaSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["ручное тестирование"], returning: "id" }).then(r => r.rows[0].id);
  const qaAutoSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Автоматизация"], returning: "id" }).then(r => r.rows[0].id);
  const commandSkill = await db.insert({ fields: "name", tables: "service.skills", values: ["Работа в команде"], returning: "id" }).then(r => r.rows[0].id);

  // скиллы (навыки) кандидата (1 to many)
  await db.createTable("service.abilities", "id", {
    id: "uuid public.uuid_generate_v4()",
    applicant: "uuid",
    skill: "uuid",
    level: "int4 0",      // уровень навыка ... неважно, но пусть будет число
    description: "text",  // на всякий случай (можно писать как приобрел такой навык?)
    removed: "bool false"
  }, client);

  await db.createRelation({
    source: "service.applicants.id",
    target: "service.abilities.applicant"
  }, client);

  await db.createRelation({
    source: "service.skills.id",
    target: "service.abilities.skill"
  }, client);

  // поля для кандидатов
  await db.createField("service.applicants", "experience", "text", client); // опыт работы
  await db.createField("service.applicants", "salary", "int4", client); // желаемая зарплата (+ от до)
  await db.createField("service.applicants", "position", "text", client); // желаемая должность
  await db.createField("service.applicants", "grade", "text", client); // грейд (сеньор, старший менеджер)
  await db.createField("service.applicants", "description", "text", client); // просто текст "о себе" в резюме
  await db.createField("service.applicants", "birthdate", "date", client); // дата рождения
  await db.createField("service.applicants", "sex", "text", client); // пол
  // семейное положение
  // образование
  // другие места работы

  // Добавляем дефолтный список кандидатов
  const vasya = await db.insert({
    fields: "name, sex, salary, experience, position, grade, birthdate, description",
    tables: "service.applicants",
    values: ['Василий Пупкин', "male", 2.3e5, "3 года", "Продуктовый аналитик", "middle", "1990-01-12",
      'Коммуникабельый, Целеустремленный, все дела. Хочу Денег и интересную работу'
    ],
    returning: "id"
  }).then(r => r.rows[0].id);

  await db.insert({ fields: "applicant, skill", values: [vasya, marketingSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [vasya, socialiseSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [vasya, englishSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [vasya, specificationSkill], tables: "service.abilities" });

  //
  const alina = await db.insert({
    fields: "name, sex, salary, experience, position, grade, birthdate, description",
    tables: "service.applicants",
    values: ['Алина Кошкина', "female", 1.8e5, "2 года", "Дизайнер", "middle", "1994-07-25",
      'Люблю рисовать кошек и макеты приложения для iPhone и iPad'
    ],
    returning: "id"
  }).then(r => r.rows[0].id);

  await db.insert({ fields: "applicant, skill", values: [alina, figmaSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [alina, photoshopSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [alina, socialiseSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [alina, commandSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [alina, antdSkill], tables: "service.abilities" });

  //
  const gena = await db.insert({
    fields: "name, sex, salary, experience, position, grade, birthdate, description",
    tables: "service.applicants",
    values: ['Гена Рябчиков', "male", 3.4e5, "11 лет и 4 месяца", "backend разработчик", "seniour", "1988-03-05",
      'Пишу на .NET с детства. Мечтаю попасть в хорошую компанию с большими перспективами'
    ],
    returning: "id"
  }).then(r => r.rows[0].id);

  await db.insert({ fields: "applicant, skill", values: [gena, cppSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [gena, csharpSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [gena, dotnetSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [gena, nodeJSSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [gena, englishSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [gena, postgresSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [gena, swiftSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [gena, pythonSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [gena, mlSkill], tables: "service.abilities" });

  //
  const oksana = await db.insert({
    fields: "name, sex, salary, experience, position, grade, birthdate, description",
    tables: "service.applicants",
    values: ['Оксана Помидорова', "female", 2.45e5, "5 лет", "frontend разработчик", "seniour", "1998-11-05",
      'Мой родной язык - JavaScript!'
    ],
    returning: "id"
  }).then(r => r.rows[0].id);

  await db.insert({ fields: "applicant, skill", values: [oksana, reactJSSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [oksana, effectorSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [oksana, vueSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [oksana, typescriptSkill], tables: "service.abilities" });

  //
  const karina = await db.insert({
    fields: "name, sex, salary, experience, position, grade, birthdate, description",
    tables: "service.applicants",
    values: ['Карина Фёдорова', "female", 0.75e5, "1 год и 7 месяцеа", "frontend разработчик", "junior", "1998-11-05",
      'В декрете поняла, что работа кассиром не дл меня. Пробую себя в веб-разработке, очень нравится, хочу сменить работу чтобы развиваться в этом направлении'
    ],
    returning: "id"
  }).then(r => r.rows[0].id);

  await db.insert({ fields: "applicant, skill", values: [karina, javascriptSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [karina, gitSkill], tables: "service.abilities" });
  await db.insert({ fields: "applicant, skill", values: [karina, qaSkill], tables: "service.abilities" });

}
