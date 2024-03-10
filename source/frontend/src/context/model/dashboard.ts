import { createEffect, sample, createEvent, createStore } from 'effector';
import type { UUID } from 'node:crypto';

import { DashboardModel } from '@app/types/model/dashboard';

import factoryExteralData from '../factory/external';
import { getDashboardsList } from '../../service/dashboard';

export const fetchDashboardsList = createEvent();
export const setCurrentDashboardId = createEvent<UUID | null>();
export const fetchDashboardsListFx = createEffect(getDashboardsList);

export const $currentDashboardId = createStore<UUID | null>(null)
  .on(fetchDashboardsListFx.doneData, (_state, data) => data[0]?.id ?? null)
  .on(setCurrentDashboardId, (_state, newDashboard) => newDashboard);
export const $dashboardsList = createStore<DashboardModel[]>([]).on(
  fetchDashboardsListFx.doneData,
  (_state, data) => data
);

sample({
  clock: fetchDashboardsList,
  target: fetchDashboardsListFx,
});
