import { createEffect, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-react-form";
import { UserModel } from "@app/types/model/user";
import { vacancyCreateService } from "../service/vacancy";
import { vacanciesListLoadFx } from "./model/vacancy";

export const $newVacancy = createStore<UserModel>({} as UserModel);

export const newVacancyForm = createForm();

export const newVacancyFormSubmit = createEvent<any>();

const newVacancyFx = createEffect(async (values: any) => {
  const result = vacancyCreateService(values);
  return result;
});

sample({
  clock: newVacancyFormSubmit,
  source: newVacancyForm.$values,
  fn: (source, clock) => source,
  target: newVacancyFx
});

sample({
  clock: newVacancyFx.doneData,
  // fn: data => data,
  target: $newVacancy
});

sample({
  clock: newVacancyFx.done,
  target: vacanciesListLoadFx
})
