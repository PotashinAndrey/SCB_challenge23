import { createEffect, sample } from "effector";
import factoryPopupBehaviour from "../factory/popup";
import factoryExteralData from "../factory/external";
import { applicantLoad } from "../../service/applicant";

export const applicantProcessPopup = factoryPopupBehaviour();
export const applicantLoadFx = createEffect(applicantLoad)
export const applicantData = factoryExteralData(applicantLoadFx);

sample({
  clock: applicantProcessPopup.open,
  target: applicantLoadFx
});

sample({
  clock: applicantLoadFx.doneData,
  target: applicantData.$store
});
