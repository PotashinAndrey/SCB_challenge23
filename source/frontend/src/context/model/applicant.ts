import { createEffect, sample, createEvent } from "effector";
import factoryPopupBehaviour from "../factory/popup";
import factoryExteralData from "../factory/external";
import { applicantApply, applicantLoad, applicantsListLoad } from "../../service/applicant";
import { UUID } from "crypto";

export const applicantesPageOpen = createEvent<any>();
export const applicantProcessPopup = factoryPopupBehaviour();
export const applicantLoadFx = createEffect(applicantLoad);
export const applicantListLoadFx = createEffect(applicantsListLoad);
export const applicantData = factoryExteralData(applicantLoadFx);
export const applicantListData = factoryExteralData(applicantListLoadFx);

sample({
  clock: applicantProcessPopup.open,
  target: applicantLoadFx
});

sample({
  clock: applicantLoadFx.doneData,
  target: applicantData.$store
});

sample({
  clock: applicantesPageOpen,
  target: applicantListLoadFx
});


sample({
    clock: applicantListLoadFx.doneData,
    target: applicantListData.$store
});

export const candidateApply = createEvent<any>();

const candidateAllpyFx = createEffect(async (id: UUID) => {
  const result = applicantApply(id);
  return result;
});

sample({
  clock: candidateApply,
  target: candidateAllpyFx
});

