import type { UUID } from 'crypto';
import { createEffect, sample, createEvent, createStore } from 'effector';
import type { ProcessModelType } from '@app/types/model/process';
import type { OptionType } from '@app/types/app';
import factoryPopupBehaviour from '../factory/popup';
// import { routing } from '../router';
// import { processesListLoad, dashboardLoad } from '@service/process';
// import { $currentDashboardId } from './dashboard';

import { dashboardDataQuery } from './dashboard';

export const $processes = createStore<Array<ProcessModelType>>([]);

sample({
  clock: dashboardDataQuery.$data,
  fn: (data) => data?.processes || [],
  target: $processes
});

export const $processesOptions = $processes
  .map(processes => processes.map<OptionType<UUID>>(process => ({ value: process.id, label: process.name })));

/** @section список процессов (дашбордов) */
// export const processesListLoadFx = createEffect(processesListLoad);
// export const processesListData = factoryExteralData(processesListLoadFx);

// sample({
//   clock: [routing.processesList.opened],
//   target: processesListLoadFx
// });

// sample({
//   clock: processesListLoadFx.doneData,
//   target: processesListData.$store
// });

export const loadDashboard = createEvent();

// sample({
//   clock: routing.dashboard.updated,
//   fn: (...args) => {
//     console.log('DASHBOARD UPDATED', args);
//   }
// });

// sample({
//   clock: loadDashboard,
//   source: $currentDashboardId,
//   target: dashboardLoadFx
// });

// sample({
//   clock: $currentDashboardId,
//   filter: (id) => id !== ('' as UUID),
//   target: dashboardLoadFx
// });

// sample({
//   clock: dashboardLoadFx.doneData,
//   target: dashboardData.$store
// });

// получаем список тасок, для каждой таски надо найти историю и по ней понять, на каком столбике ее отобразить
// export const $dashboardDataTasks = createStore([]);

// sample({
//   source: dashboardData.$store,
//   fn: (store) => {
//     const history = store?.history || [];
//     const tasks = (store?.tasks || []).map((task: any) => {
//       const localHistory = history.filter((e: any) => e.task === task.task); // todo: отсортировать по e.timestamp
//       return { ...task, history: localHistory };
//     });
//     return tasks;
//   },
//   target: $dashboardDataTasks
// });

/** @section добавление нового процесса (дашборда) */
export const processCreateStepAppendPopup = factoryPopupBehaviour();
