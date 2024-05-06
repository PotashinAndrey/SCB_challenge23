import type { UserModel, UserLoginModel, UserRegistrationModel } from '@app/types/model/user';
import type { Effect } from 'effector';
import { createEvent, sample } from 'effector';
import { createForm } from '@effector-reform/core';
import { createMutation, createQuery, update } from '@farfetched/core';
import { userRegistration, userLogin, userAbout, userLogout } from '@service/users';

// информация о пользователе
export const userAboutQuery = createQuery({ handler : userAbout });

// регистрация пользователя
export const userRegistrationMutation = createMutation({ handler: userRegistration });

// const $$userRegistrationFormValidate = createEvent()

export const $$userRegistrationForm = createForm<UserRegistrationModel>({
  schema: {
    name: '',
    email: '',
    password: '',
    passwordCheck: ''
  }
});

sample({
  clock: $$userRegistrationForm.submit,
  source: $$userRegistrationForm.$values,
  // fn: values => values,
  target: userRegistrationMutation.start
});

sample({
  clock: userRegistrationMutation.finished.success,
  fn: ({ result }: { result: UserModel }) => result.id,
  target: userAboutQuery.start
});

// update(userAboutQuery, {
//   on: userRegistrationMutation,
//   by: {
//     success: () => ({
//       refetch: true,
//       error: null
//     })
//   }
// });

// sample({
//   clock: $$userRegistrationForm.change,
//   source: $$userRegistrationForm.$values,
//   fn: (values, clock) => console.log('change', { values, clock })
// });

// sample({
//   clock: $$userRegistrationForm.changed,
//   source: $$userRegistrationForm.$values,
//   fn: (values, clock) => console.log('changed', { values, clock })
// });

// sample({
//   clock: $$userRegistrationForm.submit,
//   source: $$userRegistrationForm.$values,
//   fn: (values, clock) => console.log('subimt', { values, clock })
// });

// sample({
//   clock: $$userRegistrationForm.validate,
//   source: $$userRegistrationForm.$values,
//   fn: (values, clock) => console.log('validate', { values, clock })
// });

// // валидация повтора пароля
// sample({
//   clock: $$userRegistrationForm.change,
//   // source: $$userRegistrationForm.$values,
//   filter: ({ path }) => path === 'passwordCheck',
//   target: $$userRegistrationForm.validate
//   // fn: (values, clock) => console.log('change', { values, clock })
// });

// sample({
//   clock: $$userRegistrationForm.validate,
//   source: $$userRegistrationForm.$values,
//   fn: values => ({ passwordCheck: values.password !== values.passwordCheck ? ({ name: "passwords-not-match", params: {} }) : undefined }),
//   target: $$userRegistrationForm.$errors
// })



// $$userRegistrationForm.set

// авторизация пользователя
export const userLoginMutation = createMutation({ handler: userLogin });

export const $$userLoginForm = createForm<UserLoginModel>({
  schema: {
    login: '',
    password: ''
  }
});

sample({
  clock: $$userLoginForm.submit,
  source: $$userLoginForm.$values,
  // fn: values => values,
  target: userLoginMutation.start
});

sample({
  clock: userLoginMutation.finished.success,
  fn: ({ result }: { result: UserModel & { token: string } }) => result.id,
  target: userAboutQuery.start
});

// выход пользователя
