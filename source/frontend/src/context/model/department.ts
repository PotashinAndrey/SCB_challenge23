import { createEffect, sample, createEvent } from "effector";
import factoryExteralData from "../factory/external";
import { departamentListLoad } from "../../service/department";


export const departamentPageOpen = createEvent<any>();
export const createVacancyPopupOpen = createEvent<any>();
export const departamentListLoadFx = createEffect(departamentListLoad);
export const departamentListData = factoryExteralData(departamentListLoadFx);

sample({
    clock: departamentPageOpen,
    target: departamentListLoadFx
});

sample({
    clock: createVacancyPopupOpen,
    target: departamentListLoadFx
});

sample({
    clock: departamentListLoadFx.doneData,
    target: departamentListData.$store
});
