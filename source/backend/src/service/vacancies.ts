import type DB from "../../class/DB";
import type { UUID } from "node:crypto";
import { VacancyListFilter, VacancyModel } from "@app/types/model/vacancy";
import { departmentsList } from "./departments";

const vacanciesByDepartment = (departmentId: UUID, db: DB): Promise<Array<VacancyModel>> => {
  return db.select<VacancyModel>({
    text: `select id, name, department, description from company.vacancies where department='${departmentId}'`
  });
};

const allVacancies = (db: DB) => {
  return db.select<VacancyModel>({
    text: `select id, name, department, description from company.vacancies`
  });
};

export const vacanciesList = async (filter: VacancyListFilter, db: DB) => {
  let results = [];
  let didRequests = false;
  if (filter?.company) {
      const departments = await departmentsList({company: filter.company}, db);
      for (let i = 0; i < departments?.length; i++) {
        const departmentId = departments[i].id;
        const resultsByDepartment = await vacanciesByDepartment(departmentId, db);
        results.push(...resultsByDepartment)
      }
      didRequests = true;
  }
  if (filter?.department) {
    results = didRequests ?
              results.filter((item: VacancyModel) => item.department === filter.department) :
              await vacanciesByDepartment(filter.department, db);
    didRequests = true;
  }
  if (!didRequests) {
    results = await allVacancies(db);
  }
  return results;
};

export const createVacancy = async (values: VacancyModel, db: DB) => {
  const { name, department, description } = values;
  return await db.insert({
      fields: "name, department, description",
      tables: "company.vacancies",
      values: [name, department, description],
      returning: "id"
  });
};
