import { createRoute, createHistoryRouter } from 'atomic-router';
import { createHashHistory } from 'history';

export const routing = {
  login: createRoute(),
  dashboard: createRoute(),
  candidate: createRoute()
}

export const routes = [
  { path: '/home', route: routing.dashboard },
  { path: '/login', route: routing.login },
  { path: '/candidate', route: routing.candidate }
  // { path: '/posts/:postId', route: postRoute },
];

export const router = createHistoryRouter({ routes });
router.setHistory(createHashHistory());

