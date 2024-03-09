import { createEffect, sample, createEvent, createStore } from "effector";
import factoryExteralData from "../factory/external";
import type { UUID } from "node:crypto";
import { getDashboardsList } from "../../service/dashboard";



export const fetchDashboardsList = createEvent()
export const setCurrentdashboard = createEvent<UUID | null>()
export const fetchDashboardsListFx = createEffect(getDashboardsList)

export const $currentDashboard = createStore<UUID | null>(null)
    .on(fetchDashboardsListFx.doneData,(_state, data) => data[0]?.id ?? null)
    .on(setCurrentdashboard, (_state, newDashboard) => newDashboard)
export const $dashboardsList = createStore([]).on(fetchDashboardsListFx.doneData, (_state, data) => data)

sample({
    clock: fetchDashboardsList,
    target: fetchDashboardsListFx
});
