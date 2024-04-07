import type { UUID } from 'crypto';
import type { ProjectModel } from '@app/types/model/project';
import type DB from '../../class/DB';
import { companyById, companiesList } from './companies';

export const projectsList = async (filter: { company?: UUID } = {}, db: DB): Promise<Array<ProjectModel>> => {
  let projects: Array<ProjectModel> = [];
  if (filter?.company) {
    projects = await db.select<ProjectModel>({
      text: `select id, name, company from company.pro where company='${filter.company}'`
    });
  } else {
    projects = await db.select<ProjectModel>({
      text: `select id, name, company from company.projects`
    });
  }
  const extProjects = [];
  for (let i = 0; i < projects.length; i++) {
    const extProject = {
      ...projects[i],
      company: await companyById(projects[i].company, db)
    };
    extProjects.push(extProject);
  }
  return extProjects as unknown as Array<ProjectModel>;
};

export const projectById = async (id: UUID, db: DB) => {
  const result = await db.selectRow<ProjectModel>({
    fields: '*',
    tables: 'company.projects',
    where: 'id = $1',
    values: [id]
  });
  const extProject = {
    ...result,
    company: await companyById(result.company, db)
  };
  return extProject as unknown as ProjectModel;
};

export const projectCreate = async (data: ProjectModel, db: DB) => {
  const { name } = data;
  const company = (await companiesList(db))[0].id;
  const result = await db.insertRow<ProjectModel>({
    fields: 'name, company',
    tables: 'company.projects',
    values: [name, company]
  });
  return result;
}
