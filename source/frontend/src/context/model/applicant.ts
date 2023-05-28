import { createEffect, sample, createEvent, createStore } from "effector";
import factoryPopupBehaviour from "../factory/popup";
import factoryExteralData from "../factory/external";
import { applicantApply, applicantLoad, applicantsListLoad, calendarListLoad, candidatesInProcessList, interviewCreate } from "../../service/applicant";
import type { UUID } from "crypto";
import type { Dayjs } from 'dayjs';
import type { CandidateModel } from "@app/types/model/candidate";
import type { CandidateProcessModel } from "@app/types/model/candidateProcess";
import { CalendarEventModel } from "@app/types/model/calendar";
import { routing } from "../router";

// export const applicantesPageOpen = createEvent<any>();

/** попап в списке кандидатов */
export const applicantProcessPopup = factoryPopupBehaviour<UUID>();
export const interviewPopup = factoryPopupBehaviour<Dayjs>();
export const calendarPopup = factoryPopupBehaviour();
export const calendarPageOpen = createEvent<any>();
export const applicantLoadFx = createEffect(applicantLoad);
export const applicantListLoadFx = createEffect(applicantsListLoad);
export const applicantData = factoryExteralData(applicantLoadFx, {});
export const applicantListData = factoryExteralData<void, {items: CandidateModel[]}>(applicantListLoadFx, {items: []});
export const $interviewPopupDate = createStore<Dayjs | null>(null)
export const calendarListLoadFx = createEffect(calendarListLoad);
export const calendarListData = factoryExteralData<void, {items: CalendarEventModel[]}>(calendarListLoadFx, {items: []});

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
  clock: interviewPopup.open,
  target: $interviewPopupDate
});


sample({
  clock: [routing.candidateList.opened, interviewPopup.open],
  target: applicantListLoadFx
});

sample({
    clock: applicantListLoadFx.doneData,
    target: applicantListData.$store
});

sample({
    clock: calendarPageOpen,
    target: calendarListLoadFx
});

sample({
    clock: calendarListLoadFx.doneData,
    target: calendarListData.$store
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

export const createInterview = createEvent<any>();

const createInterviewFx = createEffect(async (model: CalendarEventModel) => {
    const result = interviewCreate(model);
    return result;
});
  
sample({
    clock: createInterview,
    target: createInterviewFx
});

// ?
export const appliedCandidetesFx = createEffect(async () => {
  const result = await candidatesInProcessList();
  return result;
});

