import type { UUID } from 'crypto';
import type { ProjectModel } from '@app/types/model/project';
import api from '../scripts/api';

export const projectListLoad = (): Promise<{ items: Array<ProjectModel> }> => api('projects/list', {});

export const projectCreate = ({ name, company }: { name: string, company: UUID }): Promise<{ id: UUID }> => api('projects/create', { name, company });
