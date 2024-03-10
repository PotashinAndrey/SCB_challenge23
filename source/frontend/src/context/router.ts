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
  projects: createRoute(),
};

export const routes = [
  { path: '/dashboard/:dashboard?', route: routing.dashboard },
  { path: '/process-create', route: routing.processCreate },
  { path: '/processes', route: routing.processesList },
  { path: '/registration', route: routing.registration },
  { path: '/login', route: routing.login },
  { path: '/projects', route: routing.projects },
  // { path: '/posts/:postId', route: postRoute },
];

export const router = createHistoryRouter({ routes });

sample({
  clock: appStated,
  fn: () => createHashHistory(),
  target: router.setHistory,
});

sample({
  clock: router.initialized,
  // clock: router.$path,
  fn: (...args) => {
    console.log('ROUTING INIT', args);
  },
});

// sample({
//   // clock: router.initialized,
//   clock: router.$path,
//   fn: (...args) => {
//     console.log("ROUTING PATH", args);
//   }
// })
