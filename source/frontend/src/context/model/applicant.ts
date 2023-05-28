import { createEffect, sample, createEvent, createStore } from "effector";
import factoryPopupBehaviour from "../factory/popup";
import factoryExteralData from "../factory/external";
import { applicantApply, applicantLoad, applicantsListLoad, candidatesInProcessList } from "../../service/applicant";
import { UUID } from "crypto";
import type { CandidateModel } from "@app/types/model/candidate";
import type { Dayjs } from 'dayjs';
import { CandidateProcessModel } from "@app/types/model/candidateProcess";

export const applicantesPageOpen = createEvent<any>();
export const applicantProcessPopup = factoryPopupBehaviour();
export const interviewPopup = factoryPopupBehaviour<Dayjs>();
export const applicantLoadFx = createEffect(applicantLoad);
export const applicantListLoadFx = createEffect(applicantsListLoad);
export const applicantData = factoryExteralData(applicantLoadFx);
export const applicantListData = factoryExteralData<void, {items: CandidateModel[]}>(applicantListLoadFx, {items: []});
export const $interviewPopupDate = createStore<Dayjs | null>(null)

sample({
  clock: applicantProcessPopup.open,
  target: applicantLoadFx
});

sample({
  clock: applicantLoadFx.doneData,
  target: applicantData.$store
});

sample({
  clock: [applicantesPageOpen, interviewPopup.open],
  target: applicantListLoadFx
});


sample({
    clock: applicantListLoadFx.doneData,
    target: applicantListData.$store
});

export const candidateApply = createEvent<any>();

const candidateAllpyFx = createEffect(async (model: CandidateProcessModel) => {
  const result = applicantApply(model);
  return result;
});

sample({
  clock: candidateApply,
  target: candidateAllpyFx
});

// ?
export const appliedCandidetesFx = createEffect(async () => {
  const result = await candidatesInProcessList();
  return result;
});

