import type { UUID } from 'crypto';
import { createEffect, sample, createEvent, createStore } from 'effector';
import { createRoute, chainRoute } from 'atomic-router';
import { attachOperation, createQuery, createMutation, update } from '@farfetched/core';
import { startChain } from '@farfetched/atomic-router';
import { getDashboardsList, dashboardCreateRequest } from '@service/dashboard';
import { dashboardLoad } from '@service/process';
import type { DashboardDataType, DashboardCreateModel } from '@app/types/model/dashboard';
import type { ProcessModelType } from '@app/types/model/process';
import factoryPopupBehaviour from '../factory/popup';
import createForm from '../factory/form';

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

/** Загрузка дашборда при открытии страницы дашборда */
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
// export const setCurrentDashboardId = createEvent<UUID | null>();
// // export const fetchDashboardsListFx = createEffect(getDashboardsList);
// const createDashboardFx = createEffect(async (values: { projectId: UUID; name: string; description?: string; columns?: string[] }) => {
//   const result = await createDashboardRequest(values.projectId, values.name, values.description, values.columns);
//   return result;
// });

// export const $currentDashboardId = createStore<UUID | null>(null)
//   .on(fetchDashboardsListFx.doneData, (_state, data) => data[0]?.id ?? null)
//   .on(setCurrentDashboardId, (_state, newDashboard) => newDashboard);
// export const $dashboardsList = createStore<DashboardModel[]>([]).on(fetchDashboardsListFx.doneData, (_state, data) => data || []);

// sample({
//   clock: [createDashboardFx.doneData, fetchDashboardsList, routing.dashboards.opened],
//   target: fetchDashboardsListFx
// });

/** Создание новой доски-дашборда */
export const dashboardCreatePopup = factoryPopupBehaviour();
export const $$dashboardCreateForm = createForm<DashboardCreateModel>({
  initialValues: {
    title: '',
    description: '',
    processes: []
  }
});

// sample({
//   clock: $$dashboardCreateForm.$values,
//   fn: console.log
// })

// форма - добавление процесса
export const dashboardCreateFormProcessAppend = createEvent();
sample({
  clock: dashboardCreateFormProcessAppend,
  source: $$dashboardCreateForm.$values,
  fn: (values: DashboardCreateModel) => {
    const length = values.processes?.length || 0;
    const process: ProcessModelType = {
      id: window.crypto.randomUUID(),
      title: "Новый столбец",
    }
    // return { ...values, processes: [...values.processes || [], process] }
    console.log('process', process, values);
    return {
      path: `processes.${length}`,
      value: process
    }
  },
  target: $$dashboardCreateForm.change
});

// const $$dashboardCreateFormProcesses = $$dashboardCreateForm.$values.map(({ processes }) => processes);

export const dashboardCreateMutation = createMutation({ handler: dashboardCreateRequest });

sample({
  clock: $$dashboardCreateForm.submit,
  source: { values: $$dashboardCreateForm.$values },
  fn: ({ values }) => values,
  target: dashboardCreateMutation.start
});

sample({
  clock: dashboardCreateMutation.finished.success,
  target: [dashboardCreatePopup.close, $$dashboardCreateForm.reset]
});

update(dashboardsListQuery, {
  on: dashboardCreateMutation,
  by: {
    success: () => ({
      refetch: true,
      error: null
    })
  }
});

// routes.view.open

// export const $canAddNewColumn = createStore(true);
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
