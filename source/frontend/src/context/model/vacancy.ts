import { createEffect, sample, createEvent } from "effector";
import factoryPopupBehaviour from "../factory/popup";
import factoryExteralData from "../factory/external";
import { vacancyListLoad } from "../../service/vacancy";


export const vacancyCreatePopup = factoryPopupBehaviour();

export const vacanciesPageOpen = createEvent<any>();
export const vacanciesListLoadFx = createEffect(vacancyListLoad);
export const vacanciesListData = factoryExteralData(vacanciesListLoadFx);

sample({
    clock: vacanciesPageOpen,
    target: vacanciesListLoadFx
});

sample({
    clock: vacanciesListLoadFx.doneData,
    target: vacanciesListData.$store
});
