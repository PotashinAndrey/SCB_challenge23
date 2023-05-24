import { createRoute, createHistoryRouter } from 'atomic-router';
import { createHashHistory } from 'history';

export const routing = {
  login: createRoute(),
  registration: createRoute(),
  dashboard: createRoute(),
  candidate: createRoute(),
  candidateCreate: createRoute(),
}

export const routes = [
  { path: '/home', route: routing.dashboard },
  { path: '/registration', route: routing.registration },
  { path: '/login', route: routing.login },
  { path: '/candidate', route: routing.candidate },
  { path: '/candidate-create', route: routing.candidateCreate }
  // { path: '/posts/:postId', route: postRoute },
];

export const router = createHistoryRouter({ routes });
router.setHistory(createHashHistory());

