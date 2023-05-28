import { createEffect, sample, createEvent, createStore } from "effector";
import factoryPopupBehaviour from "../factory/popup";
import factoryExteralData from "../factory/external";
import { applicantApply, applicantLoad, applicantsListLoad, candidatesInProcessList } from "../../service/applicant";
import type { UUID } from "crypto";
import type { Dayjs } from 'dayjs';
import type { CandidateModel } from "@app/types/model/candidate";
import type { CandidateProcessModel } from "@app/types/model/candidateProcess";
import { routing } from "../router";

// export const applicantesPageOpen = createEvent<any>();

/** попап в списке кандидатов */
export const applicantProcessPopup = factoryPopupBehaviour<UUID>();
export const interviewPopup = factoryPopupBehaviour<Dayjs>();
export const applicantLoadFx = createEffect(applicantLoad);
export const applicantListLoadFx = createEffect(applicantsListLoad);
export const applicantData = factoryExteralData(applicantLoadFx, {});
export const applicantListData = factoryExteralData<void, {items: CandidateModel[]}>(applicantListLoadFx, {items: []});
export const $interviewPopupDate = createStore<Dayjs | null>(null)

/** попап в дашборде */
export const candidateProcessPopup = factoryPopupBehaviour<UUID>();

sample({
  clock: [applicantProcessPopup.open, candidateProcessPopup.open],
  // fn: (...args) => { console.log("applicantLoadFx", args); return args[0] },
  target: applicantLoadFx
});

sample({
  clock: applicantLoadFx.doneData,
  target: applicantData.$store
});

sample({
  clock: [routing.candidateList.opened, interviewPopup.open],
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

