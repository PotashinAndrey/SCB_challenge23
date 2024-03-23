import type { UserLoginModel } from '@app/types/model/user';
import api from '../scripts/api';

export const loginService = (model: UserLoginModel) => api<UserLoginModel, string>('users/login', model);
