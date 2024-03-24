import type { UserLoginModel, UserModel } from '@app/types/model/user';
import api from '../scripts/api';
import { UUID } from 'crypto';

export const loginUser = (model: UserLoginModel) => api<UserLoginModel, { token: string }>('users/login', model);

export const logoutUser = (id: UUID) => api<{ id: UUID }, void>('users/logout', { id });

export const getUserData = () => {
  return api<any, { user: UserModel }>('users/userInfo', null);
};
