import { createEffect, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-react-form";
import { routing } from "./router";
import api from "../scripts/api";
import { UserModel } from "@app/types/model/user";
import { loginService } from "../service/users";

export const $user = createStore<UserModel>({} as UserModel);

export const loginForm = createForm();

export const loginFormSubmit = createEvent<any>();

const loginFx = createEffect(async (values: any) => {
  const result = loginService(values);
  return result;
});

sample({
  clock: loginFormSubmit,
  source: loginForm.$values,
  fn: (source, clock) => source,
  target: loginFx
});

sample({
  clock: loginFx.doneData,
  // fn: data => data,
  target: $user
});

sample({
  clock: loginFx.done,
  target: routing.dashboard.open
})
