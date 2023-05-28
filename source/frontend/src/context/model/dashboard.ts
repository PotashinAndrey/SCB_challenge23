import { createEffect, sample, createEvent } from "effector";
import factoryExteralData from "../factory/external";
import { getDashboardById } from "../../service/dashboard";


export const dashboardPageOpen = createEvent<any>();
export const dashboardDataLoadFx = createEffect(getDashboardById);
export const dashboardColumnsData = factoryExteralData<any>(dashboardDataLoadFx, []);

sample({
    clock: dashboardPageOpen,
    target: dashboardDataLoadFx
});

sample({
    clock: dashboardDataLoadFx.doneData,
    target: dashboardColumnsData.$store
});
