import { createEffect, sample, createEvent, createStore } from 'effector';
import type { UUID } from 'node:crypto';
import factoryPopupBehaviour from '../factory/popup';

import { DashboardModel } from '@app/types/model/dashboard';

import factoryExteralData from '../factory/external';
import { getDashboardsList, createDashboardRequest } from '../../service/dashboard';

export const fetchDashboardsList = createEvent();
export const setCurrentdashboard = createEvent<UUID | null>();

export const fetchDashboardsListFx = createEffect(getDashboardsList);
const createDashboardFx = createEffect(async (values: {projectId: UUID, name: string, discription?: string}) => {
  const result = await createDashboardRequest(values.projectId, values.name, values.discription );
  return result;
});


export const $currentDashboard = createStore<UUID | null>(null)
  .on(fetchDashboardsListFx.doneData, (_state, data) => data[0]?.id ?? null)
  .on(setCurrentdashboard, (_state, newDashboard) => newDashboard);
export const $dashboardsList = createStore<DashboardModel[]>([]).on(
  fetchDashboardsListFx.doneData,
  (_state, data) => data || []
);


sample({
  clock: createDashboardFx.doneData,
  target: fetchDashboardsListFx
});

sample({
  clock: fetchDashboardsList,
  target: fetchDashboardsListFx,
});

export const createDashboardPopup = factoryPopupBehaviour();
