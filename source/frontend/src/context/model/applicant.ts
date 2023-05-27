import { createEffect, sample, createEvent } from "effector";
import factoryPopupBehaviour from "../factory/popup";
import factoryExteralData from "../factory/external";
import { applicantLoad, applicantsListLoad, departamentListLoad, vacancyListLoad } from "../../service/applicant";

export const applicantesPageOpen = createEvent<any>();
export const departamentPageOpen = createEvent<any>();
export const vacanciesPageOpen = createEvent<any>();
export const applicantProcessPopup = factoryPopupBehaviour();
export const applicantLoadFx = createEffect(applicantLoad);
export const applicantListLoadFx = createEffect(applicantsListLoad);
export const departamentListLoadFx = createEffect(departamentListLoad);
export const vacanciesListLoadFx = createEffect(vacancyListLoad);
export const applicantData = factoryExteralData(applicantLoadFx);
export const applicantListData = factoryExteralData(applicantListLoadFx);
export const departamentListData = factoryExteralData(departamentListLoadFx);
export const vacanciesListData = factoryExteralData(vacanciesListLoadFx);

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

sample({
    clock: departamentPageOpen,
    target: departamentListLoadFx
});

sample({
    clock: departamentListLoadFx.doneData,
    target: departamentListData.$store
});

sample({
    clock: vacanciesPageOpen,
    target: vacanciesListLoadFx
});

sample({
    clock: vacanciesListLoadFx.doneData,
    target: vacanciesListData.$store
});
