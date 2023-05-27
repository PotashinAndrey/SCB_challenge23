import { createEffect, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-react-form";
import api from "../scripts/api";
import { createCandidateService } from "../service/candidate";

export const $newCandidate = createStore({});

export const candidateCreateForm = createForm();

export const candidateCreateFormSubmit = createEvent<any>();

const candidateCreateFx = createEffect(async (values: any) => {
  const result = createCandidateService(values);
  return result;
}); //todo

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
