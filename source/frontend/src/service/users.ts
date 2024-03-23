import type { UserLoginModel, UserModel } from '@app/types/model/user';
import api from '../scripts/api';

export const loginUser = (model: UserLoginModel) => api<UserLoginModel, { token: string }>('users/login', model);

export const getUserData = () => {
  return api<any, { user: UserModel }>('users/userInfo', null);
};
