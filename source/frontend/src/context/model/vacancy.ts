import { createEffect, sample, createEvent } from "effector";
import factoryPopupBehaviour from "../factory/popup";
import factoryExteralData from "../factory/external";
import { routing } from "../router";
import { vacancyListLoad } from "../../service/vacancy";

export const vacancyCreatePopup = factoryPopupBehaviour();

export const vacanciesListLoadFx = createEffect(vacancyListLoad);
export const vacanciesListData = factoryExteralData(vacanciesListLoadFx);

sample({
    clock: routing.vacancies.opened,
    target: vacanciesListLoadFx
});

sample({
    clock: vacanciesListLoadFx.doneData,
    target: vacanciesListData.$store
});
