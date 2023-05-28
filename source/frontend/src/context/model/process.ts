import { createEffect, sample, createEvent, createStore } from "effector";
import factoryPopupBehaviour from "../factory/popup";
import factoryExteralData from "../factory/external";
import { routing } from "../router";
import { processesListLoad, dashboardLoad } from "../../service/process";
import { UUID } from "node:crypto";
import CandidateProcessPopup from "src/popup/CandidateProcessPopup";
import { candidateProcessPopup } from "./candidate";

/** @section список процессов (дашбордов) */
export const processesListLoadFx = createEffect(processesListLoad);
export const processesListData = factoryExteralData(processesListLoadFx);

sample({
  clock: [routing.processesList.opened, candidateProcessPopup.open],
  target: processesListLoadFx
});

sample({
  clock: processesListLoadFx.doneData,
  target: processesListData.$store
});

/** @section открытие дашборда */
export const $dashboardID = createStore<UUID>("" as UUID);
export const dashboardLoadFx = createEffect<UUID, any>(dashboardLoad);
export const dashboardData = factoryExteralData(dashboardLoadFx, []);

sample({
  clock: routing.dashboard.updated,
  fn: (...args) => { console.log("DASHBOARD UPDATED", args) }
});

sample({
  clock: routing.dashboard.opened,
  filter: ({ params }) => params.dashboard !== undefined,
  fn: ({ params }) => params.dashboard || ("" as UUID),
  target: $dashboardID
});

sample({
  clock: $dashboardID,
  filter: id => id !== "" as UUID,
  target: dashboardLoadFx
});

sample({
  clock: dashboardLoadFx.doneData,
  target: dashboardData.$store
});

// sample({
//   clock: routing.dashboard.$isOpened,
//   fn: (isOpened) => { console.log("DASHBOARD STATE", isOpened) }
// })

/** @section добавление нового процесса (дашборда) */
export const processCreateStepAppendPopup = factoryPopupBehaviour();

// export const vacanciesPageOpen = createEvent<any>();
// export const vacanciesListLoadFx = createEffect(vacancyListLoad);
// export const vacanciesListData = factoryExteralData(vacanciesListLoadFx);

// sample({
//     clock: vacanciesPageOpen,
//     target: vacanciesListLoadFx
// });

// sample({
//     clock: vacanciesListLoadFx.doneData,
//     target: vacanciesListData.$store
// });
