import { createEffect, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-react-form";
import api from "../../scripts/api";

export const $user = createStore({});

export const loginForm = createForm();

export const loginFormSubmit = createEvent<any>();

const loginFx = createEffect(async (values: any) => {
  console.log("fx", { values })
  const result = await api<any, any>("users/login", values);
  console.log("result fx", { result });
  return result;
});

sample({
  clock: loginFormSubmit,
  source: loginForm.$values,
  fn: (source, clock) => {
    console.log("sample", { source })
    return source;
  },
  target: loginFx
});

sample({
  clock: loginFx.doneData,
  // fn: data => data
  target: $user
});
