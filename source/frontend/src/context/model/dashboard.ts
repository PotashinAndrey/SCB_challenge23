import { createEffect, sample, createEvent, createStore } from 'effector';
import { createForm } from 'effector-react-form';
import type { UUID } from 'node:crypto';
import factoryPopupBehaviour from '../factory/popup';

import { DashboardModel } from '@app/types/model/dashboard';

import factoryExteralData from '../factory/external';
import { getDashboardsList, createDashboardRequest } from '../../service/dashboard';
import { $currentProjectId } from './project';
import { routing } from '../router';

export const fetchDashboardsList = createEvent();
export const setCurrentDashboardId = createEvent<UUID | null>();
export const fetchDashboardsListFx = createEffect(getDashboardsList);
const createDashboardFx = createEffect(async (values: { projectId: UUID, name: string, description?: string }) => {
  const result = await createDashboardRequest(values.projectId, values.name, values.description);
  return result;
});


export const $currentDashboardId = createStore<UUID | null>(null)
  .on(fetchDashboardsListFx.doneData, (_state, data) => data[0]?.id ?? null)
  .on(setCurrentDashboardId, (_state, newDashboard) => newDashboard);
export const $dashboardsList = createStore<DashboardModel[]>([]).on(
  fetchDashboardsListFx.doneData,
  (_state, data) => data || []
);


sample({
  clock: [createDashboardFx.doneData, fetchDashboardsList, routing.dashboards.opened],
  target: fetchDashboardsListFx
});

export const createDashboardPopup = factoryPopupBehaviour();

export const createDashbordForm = createForm();

export const createDashbordFormSubmit = createEvent<any>();

sample({
  clock: createDashbordFormSubmit,
  source: [createDashbordForm.$values, $currentProjectId],
  fn: ([formValues, currentProjectId]) => ({
    name: formValues.name,
    description: formValues.description,
    projectId: currentProjectId,
  }),
  target: createDashboardFx
});

sample({
  clock: createDashbordFormSubmit,
  target: createDashbordForm.reset
});
