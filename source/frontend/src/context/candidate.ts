import { createEffect, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-react-form";
import { createCandidateService } from "../service/candidate";
import { routing } from "./router";

export const $newCandidate = createStore({});
export const candidateCreateForm = createForm();
export const candidateCreateFormSubmit = createEvent<any>();

const candidateCreateFx = createEffect(async (values: any) => {
  const result = createCandidateService(values);
  return result;
});

sample({
    clock: candidateCreateFormSubmit,
    source: candidateCreateForm.$values,
    fn: (source, clock) => source,
    target: candidateCreateFx
});

sample({
    clock: candidateCreateFx.doneData,
    // fn: data => data
    target: $newCandidate
});

sample({
  clock: candidateCreateFx.doneData,
  target: routing.candidateList.open
});
