import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { skillById } from "./skills";
import { createTask, tasksList } from "./tasks";
import { processByDashboardId } from "./dashboards";
import { CandidateModel } from "@app/types/model/candidate";
import { CandidateProcessModel } from "@app/types/model/candidateProcess";

export const candidatesList = async (db: DB): Promise<Array<CandidateModel>> => {
  return db.select<any>({
    fields: "*",
    tables: "service.applicants"
  });
}

export const candidatesInProcessList = async (db: DB): Promise<Array<CandidateModel>> => {
  const appliedCandidetes = await tasksList({}, db);
  const allCandiates = await candidatesList(db);

  console.log("appliedCandidetes", appliedCandidetes)

  return (allCandiates || []).filter(e => {
    return (appliedCandidetes || []).map(({ applicant }) => applicant).includes(e.id)
  })
}

export const createCandidate = async (values: CandidateModel, db: DB): Promise<UUID> => {
  const { name, birthdate, description, email, experience, file, link, notes, phone, photo, position, salary, sex, skills, tags, telegram, vacancy, vk, grade } = values;
  const result = await db.insert({
    fields: "vacancy, name, birthdate, description, email, experience, file, link, notes, phone, photo, position, salary, sex, telegram, vk, grade",
    tables: "service.applicants",
    values: [vacancy, name, birthdate, description, email, experience, file, link, notes, phone, photo, position, salary, sex, telegram, vk, grade],
    returning: "id"
  });
  const candidateId = result.rows[0].id;
  console.log(candidateId)
  for (const skillId of values.skills) {
    await db.insert({
      fields: "applicant, skill",
      tables: "service.abilities",
      values: [candidateId, skillId]
    });
  }
  for (const tagId of values.tags) {
    await db.insert({
      fields: "applicant, skill, tag",
      tables: "service.abilities",
      values: [candidateId, tagId, true]
    });
  }
  return result;
}

export const candidateByID = async (id: UUID, db: DB): Promise<CandidateModel> => {
  const candidate = await db.selectRow<CandidateModel>({
    fields: "*",
    tables: "service.applicants",
    where: "id = $1",
    values: [id]
  });
  return candidate;
  // TODO: нет же этих полей!
  // let extCandidateSkills = [];
  // let extCandidateTags = [];
  // console.log(1, { candidate })
  // for (const skillId of candidate.skills) {
  //   const skill = await skillById(skillId, db);
  //   extCandidateSkills.push(skill);
  // }
  // console.log(2, { candidate, extCandidateSkills })

  // for (const tagId of candidate.tags) {
  //   const tag = await skillById(tagId, db);
  //   extCandidateTags.push(tag);
  // }
  // console.log(3, { candidate, extCandidateSkills, extCandidateTags })

  // return {
  //   ...candidate,
  //   skills: extCandidateSkills,
  //   tags: extCandidateTags
  // } as unknown as CandidateModel;
}

export const applyCandidate = async (model: CandidateProcessModel, db: DB) => {
  const task = await createTask({
    applicant: model.candidateId,
    // FIXME Сейчас захардкожен дашборд разработки.
    // Наверное нужна выпадашка на интерфейсе с возможностью выбора дашборда.
    dashboard: model.processId
  }, db);

  const process = await processByDashboardId(model.processId, db);
  const firstColumn = process.find(e => e.order === 0);

  // TODO: валидация тут

  if (firstColumn) {
    // помещаем таску на первый столбик
    await db.insertRow({
      tables: "flow.history",
      fields: "task, to",
      values: [task, firstColumn.id]
    });
  }

  // TODO: Сделать update кандидата. removed: true
  return { task };
};

export const historyAppend = async (taskId: UUID, columnId: string, db: DB) => {
  const id = await db.insertRow({
    tables: "flow.history",
    fields: "task, to",
    values: [taskId, columnId]
  });

  return {id}
}
