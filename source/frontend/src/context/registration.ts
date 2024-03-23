import { createEffect, createEvent, createStore, sample } from 'effector';
import { createForm } from 'effector-react-form';
import api from '../scripts/api';
import { routing } from './router';

export const $user = createStore({});

export const registrationForm = createForm();

export const registrationFormSubmit = createEvent<any>();

const registrationFx = createEffect(async (values: any) => {
  const result = await api<any, any>('users/registration', values);
  return result;
});

sample({
  clock: registrationFormSubmit,
  source: registrationForm.$values,
  fn: (source, clock) => source,
  target: registrationFx
});

sample({
  clock: registrationFx.doneData,
  // fn: data => data
  target: $user
});

sample({
  clock: registrationFx.done,
  target: routing.dashboard.open
});
