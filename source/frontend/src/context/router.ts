import { createEvent, sample } from 'effector';
import { createRoute, createHistoryRouter, createRouterControls } from 'atomic-router';
import { createHashHistory } from 'history';
import { routes as dashboardRoutes, dashboardsListQuery } from './model/dashboard';
import { routes as projectRoutes } from './model/project';

export const routing = {
  auth: {
    login: createRoute(),
    registration: createRoute()
  },
  project: projectRoutes,
  dashboard: dashboardRoutes,

  processCreate: createRoute(),
  processesList: createRoute(),
  forbidden: createRoute()
};

export const routes = [
  { path: '/registration', route: routing.auth.registration },
  { path: '/login', route: routing.auth.login },

  { path: '/projects', route: routing.project.list },

  { path: '/dashboard', route: routing.dashboard.list },
  { path: '/dashboard/:dashboard', route: routing.dashboard.view },

  { path: '/process-create', route: routing.processCreate },
  { path: '/processes', route: routing.processesList },

  { path: '/forbidden', route: routing.forbidden }
];

export const controls = createRouterControls();
export const router = createHistoryRouter({ routes, controls });

export const appStated = createEvent();
sample({
  clock: appStated,
  fn: () => createHashHistory(),
  target: router.setHistory
});

sample({
  clock: router.initialized,
  fn: (...args) => {
    console.log('ROUTING INIT', args);
  }
});

// Загрузка списка дашбордов при инициализации приложения
sample({
  clock: router.initialized, // TODO: Спрятать за логин (chainRoute?)
  target: dashboardsListQuery.start
});

// sample({
//   clock: router.$path,
//   fn: (...args) => {
//     console.log("ROUTING PATH", args);
//   }
// })
