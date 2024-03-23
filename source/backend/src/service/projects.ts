import type DB from '../../class/DB';
import type { UUID } from 'node:crypto';
import { ProjectModel } from '@app/types/model/projects';
import { companyById } from './companies';

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
  let extProjects = [];
  for (let i = 0; i < projects.length; i++) {
    let extProject = {
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
