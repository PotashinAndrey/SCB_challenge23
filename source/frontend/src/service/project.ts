import api from '../scripts/api';

export const projectListLoad = (): Promise<any> => {
  return api('projects/list', {});
};
