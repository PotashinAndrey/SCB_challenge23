import type { UUID } from 'crypto';
import type { UserRegistrationModel, UserLoginModel, UserModel } from '@app/types/model/user';
import api from '../scripts/api';

export const userRegistration = (values: UserRegistrationModel) => api<UserModel, UserRegistrationModel>('users/registration', values);

export const userLogin = (values: UserLoginModel) => api<UserModel & { token: string }, UserLoginModel>('users/login', values);

export const userLogout = (id: UUID) => api<void, { id: UUID }>('users/logout', { id });

export const userAbout = (id: UUID) => api<{ user: UserModel }, { id: UUID }>('users/about', { id });
