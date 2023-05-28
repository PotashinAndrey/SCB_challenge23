import { createRoute, createHistoryRouter } from 'atomic-router';
import { createEvent, sample } from 'effector';
import { createHashHistory } from 'history';
import type { UUID } from 'node:crypto';

export const appStated = createEvent();

export const routing = {
  login: createRoute(),
  registration: createRoute(),
  dashboard: createRoute<{ dashboard?: UUID }>(),
  processCreate: createRoute(),
  processesList: createRoute(),
  candidate: createRoute(),
  candidateCreate: createRoute(),
  candidateList: createRoute(),
  candidates: createRoute(),
  calendar: createRoute(),
  vacancies: createRoute(),
  departments: createRoute()
}

export const routes = [
  { path: '/home/:dashboard?', route: routing.dashboard },
  { path: '/process-create', route: routing.processCreate },
  { path: '/processes', route: routing.processesList },
  { path: '/registration', route: routing.registration },
  { path: '/login', route: routing.login },
  { path: '/candidate', route: routing.candidate },
  { path: '/candidate-list', route: routing.candidateList },
  { path: '/candidate-create', route: routing.candidateCreate },
  { path: '/calendar', route: routing.calendar },
  { path: '/vacancies', route: routing.vacancies },
  { path: '/departments', route: routing.departments }
  // { path: '/posts/:postId', route: postRoute },
];

export const router = createHistoryRouter({ routes });

sample({
  clock: appStated,
  fn: () => createHashHistory(),
  target: router.setHistory
});

sample({
  clock: router.initialized,
  // clock: router.$path,
  fn: (...args) => {
    console.log("ROUTING INIT", args);
  }
})

// sample({
//   // clock: router.initialized,
//   clock: router.$path,
//   fn: (...args) => {
//     console.log("ROUTING PATH", args);
//   }
// })
