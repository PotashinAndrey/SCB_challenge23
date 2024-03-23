import { createEffect, createEvent, createStore, sample } from 'effector';
import { createForm } from 'effector-react-form';
import { routing } from './router';
import api from '../scripts/api';
import { UserModel } from '@app/types/model/user';
import { getUserData, loginUser } from '../service/users';
import { message } from 'antd';

type LoginStatus = { status?: 'success' | 'danger'; message: string; data?: any };

export const $currentUser = createStore<UserModel>({} as UserModel);
export const $logInStatus = createStore<LoginStatus>({ message: '' });

export const loginForm = createForm();

export const loginFormSubmit = createEvent<any>();
export const setLogInStatus = createEvent<LoginStatus>();

const loginFormSubmitFx = createEffect(loginUser);
const getUserDataFx = createEffect(getUserData);

sample({
  clock: loginFormSubmit,
  source: loginForm.$values,
  fn: (source, clock) => source,
  target: loginFormSubmitFx
});

sample({
  clock: loginFormSubmitFx.done,
  fn: ({ params, result }) => {
    const token = result.token;
    // document.cookie = `authToken=${token}; path=/;`;
    setLogInStatus({ message: 'Успех', status: 'success', data: result });
    void message.success(`Добро пожаловать, ${params.login}!`);
    return {};
  },
  target: [routing.dashboard.open, getUserDataFx]
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

sample({
  clock: getUserDataFx.doneData,
  target: $currentUser
});
