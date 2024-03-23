import { createEffect, createEvent, createStore, sample } from 'effector';
import { createForm } from 'effector-react-form';
import { routing } from './router';
import api from '../scripts/api';
import { UserModel } from '@app/types/model/user';
import { loginService } from '../service/users';
import { message } from 'antd';

type LoginStatus = { status?: 'success' | 'danger'; message: string; data?: any };

export const $currentUser = createStore<UserModel>({} as UserModel);
export const $logInStatus = createStore<LoginStatus>({ message: '' });

export const loginForm = createForm();

export const loginFormSubmit = createEvent<any>();
export const setLogInStatus = createEvent<LoginStatus>();

const loginFormSubmitFx = createEffect(loginService);

sample({
  clock: loginFormSubmit,
  source: loginForm.$values,
  fn: (source, clock) => source,
  target: loginFormSubmitFx
});

sample({
  clock: loginFormSubmitFx.doneData,
  target: $currentUser
});

sample({
  clock: loginFormSubmitFx.doneData,
  fn: (data) => {
    setLogInStatus({ message: 'Успех', status: 'success', data });
    void message.success(`Добро пожаловать, ${data.name}!`);
  },
  target: routing.dashboard.open
});

sample({
  clock: loginFormSubmitFx.failData,
  fn: (error) => {
    setLogInStatus({ message: error.message, status: 'danger' });
    void message.error(`Не удалось авторизоваться: ${error.message}`);
  }
});

sample({
  clock: setLogInStatus,
  target: $logInStatus
});
