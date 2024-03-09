import { createEffect, sample, createEvent, createStore } from "effector";
import factoryPopupBehaviour from "../factory/popup";
import factoryExteralData from "../factory/external";
import { routing } from "../router";
import { processesListLoad, dashboardLoad } from "../../service/process";
import { appendHistory } from "../../service/dashboard";
import { UUID } from "node:crypto";
// import { candidateProcessPopup } from "./candidate";
import { $currentDashboard } from "./dashboard";

/** @section список процессов (дашбордов) */
export const processesListLoadFx = createEffect(processesListLoad);
export const processesListData = factoryExteralData(processesListLoadFx);

sample({
  clock: [routing.processesList.opened],
  target: processesListLoadFx
});

sample({
  clock: processesListLoadFx.doneData,
  target: processesListData.$store
});

/** @section открытие дашборда */
export const dashboardLoadFx = createEffect<UUID, any>(dashboardLoad);
export const dashboardData = factoryExteralData(dashboardLoadFx, {});

sample({
  clock: routing.dashboard.updated,
  fn: (...args) => { console.log("DASHBOARD UPDATED", args) }
});

sample({
  clock: routing.dashboard.opened,
  // filter: ({ params }) => params.dashboard !== undefined,
  fn: ({ params }) => params.dashboard || ("b3791ff6-15a7-4ea8-a909-ce8a9f94d669" as UUID),
  target: $currentDashboard
});

sample({
  clock: $currentDashboard,
  filter: id => id !== "" as UUID,
  target: dashboardLoadFx
});

sample({
  clock: dashboardLoadFx.doneData,
  target: dashboardData.$store
});

// получаем список тасок, для каждой таски надо найти историю и по ней понять, на каком столбике ее отобразить
export const $dashboardDataTasks = createStore([]);

sample({
  source: dashboardData.$store,
  fn: store => {
    const history = store?.history || [];
    const tasks = (store?.tasks || []).map((task: any) => {
      const localHistory = history.filter((e: any) => e.task === task.task); // todo: отсортировать по e.timestamp
      const step = localHistory.reduce((current: any, e: any) => e.to === null ? current : e.to, null); // !
      return { ...task, history: localHistory, step };
    });
    return tasks;
  },
  target: $dashboardDataTasks
})

export const appendHistoryFx = createEffect(appendHistory);


sample({
  clock: appendHistoryFx.done,
  fn: ({params}) => {

      return params.dashboardId;
  },
  target: dashboardLoadFx
});



/** @section добавление нового процесса (дашборда) */
export const processCreateStepAppendPopup = factoryPopupBehaviour();
