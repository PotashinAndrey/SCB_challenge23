import { createEffect, sample, createEvent, createStore } from 'effector';
import factoryPopupBehaviour from '../factory/popup';
import factoryExteralData from '../factory/external';
import { routing } from '../router';
import { processesListLoad, dashboardLoad } from '../../service/process';
import type { UUID } from 'node:crypto';
import { $currentDashboardId } from './dashboard';

/** @section список процессов (дашбордов) */
export const processesListLoadFx = createEffect(processesListLoad);
export const processesListData = factoryExteralData(processesListLoadFx);

sample({
  clock: [routing.processesList.opened],
  target: processesListLoadFx,
});

sample({
  clock: processesListLoadFx.doneData,
  target: processesListData.$store,
});

export const loadDashboard = createEvent();
export const dashboardLoadFx = createEffect<UUID, any>(dashboardLoad);
export const dashboardData = factoryExteralData(dashboardLoadFx, {});

sample({
  clock: routing.dashboard.updated,
  fn: (...args) => {
    console.log('DASHBOARD UPDATED', args);
  },
});

sample({
  clock: loadDashboard,
  source: $currentDashboardId,
  target: dashboardLoadFx,
});

sample({
  clock: $currentDashboardId,
  filter: (id) => id !== ('' as UUID),
  target: dashboardLoadFx,
});

sample({
  clock: dashboardLoadFx.doneData,
  target: dashboardData.$store,
});

// получаем список тасок, для каждой таски надо найти историю и по ней понять, на каком столбике ее отобразить
export const $dashboardDataTasks = createStore([]);

sample({
  source: dashboardData.$store,
  fn: (store) => {
    const history = store?.history || [];
    const tasks = (store?.tasks || []).map((task: any) => {
      const localHistory = history.filter((e: any) => e.task === task.task); // todo: отсортировать по e.timestamp
      return { ...task, history: localHistory };
    });
    return tasks;
  },
  target: $dashboardDataTasks,
});

/** @section добавление нового процесса (дашборда) */
export const processCreateStepAppendPopup = factoryPopupBehaviour();
