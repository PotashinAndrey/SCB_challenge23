import type { UUID } from 'crypto';
import { createEffect, sample, createEvent, createStore } from 'effector';
import { createRoute, chainRoute } from 'atomic-router';
import { attachOperation, createQuery } from '@farfetched/core';
import { startChain } from '@farfetched/atomic-router';
import { getDashboardsList, createDashboardRequest } from '@service/dashboard';
import { dashboardLoad } from '@service/process';
import type { DashboardModel, DashboardDataType } from '@app/types/model/dashboard';
import factoryPopupBehaviour from '../factory/popup';


/** Список дашбордов */
export const dashboardsListQuery = createQuery({
  handler: getDashboardsList,
  initialData: []
});

/** Инфо о конкретном дашборде */
export const dashboardDataQuery = createQuery({
  handler: dashboardLoad,
  initialData: {} as DashboardDataType
  // TODO: placeholderData
});

/** Роуты */
export const routes = {
  list: createRoute(),
  view: createRoute<{ dashboard?: UUID }>()
};

// Загрузка дашборда при открытии страницы дашборда
chainRoute({
  route: routes.view,
  ...startChain(attachOperation(
    dashboardDataQuery,
    { mapParams: ({ dashboard }: { dashboard: UUID }) => dashboard }
  ))
});

// Сохранение текущего дашборда (возможно, не нужно, он есть в dashboardDataQuery.$data)
// export const $currentDashboard = createStore<DashboardModel>({} as DashboardModel);
// sample({
//   clock: dashboardDataQuery.finished.success,
//   filter: ({ result }) => Boolean(result.dashboard),
//   fn: ({ result }) => result.dashboard,
//   target: $currentDashboard
// });

// ---

// export const fetchDashboardsList = createEvent();
export const setCurrentDashboardId = createEvent<UUID | null>();
// export const fetchDashboardsListFx = createEffect(getDashboardsList);
const createDashboardFx = createEffect(async (values: { projectId: UUID; name: string; description?: string; columns?: string[] }) => {
  const result = await createDashboardRequest(values.projectId, values.name, values.description, values.columns);
  return result;
});

// export const $currentDashboardId = createStore<UUID | null>(null)
//   .on(fetchDashboardsListFx.doneData, (_state, data) => data[0]?.id ?? null)
//   .on(setCurrentDashboardId, (_state, newDashboard) => newDashboard);
// export const $dashboardsList = createStore<DashboardModel[]>([]).on(fetchDashboardsListFx.doneData, (_state, data) => data || []);

// sample({
//   clock: [createDashboardFx.doneData, fetchDashboardsList, routing.dashboards.opened],
//   target: fetchDashboardsListFx
// });

export const createDashboardPopup = factoryPopupBehaviour();

// export const createDashbordForm = createForm();

export const createDashbordFormSubmit = createEvent<any>();

export const $canAddNewColumn = createStore(true);
// sample({
//   clock: createDashbordForm.$values,
//   source: createDashbordForm.$values,
//   fn: (formValues) => {
//     if (!formValues?.columns?.length) return true;
//     return formValues?.columns?.length < 7;
//   },
//   target: $canAddNewColumn
// });

// sample({
//   clock: createDashbordFormSubmit,
//   source: [createDashbordForm.$values, $currentProjectId],
//   fn: ([formValues, currentProjectId]) => ({
//     name: formValues.name,
//     description: formValues.description,
//     projectId: currentProjectId,
//     columns: formValues.columns.filter((column: string) => column.length !== 0)
//   }),
//   target: createDashboardFx
// });

// sample({
//   clock: createDashboardFx.done,
//   target: [createDashbordForm.reset, createDashboardPopup.close]
// });
