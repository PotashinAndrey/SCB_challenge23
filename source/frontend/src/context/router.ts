import { createRoute, createHistoryRouter } from 'atomic-router';
import { createHashHistory } from 'history';

export const routing = {
  login: createRoute(),
  registration: createRoute(),
  dashboard: createRoute(),
  processCreate: createRoute(),
  candidate: createRoute(),
  candidateCreate: createRoute(),
  candidateList: createRoute(),
  calendar: createRoute(),
  vacancies: createRoute(),
  departments: createRoute(),
  candidates: createRoute()
}

export const routes = [
  { path: '/home', route: routing.dashboard },
  { path: '/process-create', route: routing.processCreate },
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
router.setHistory(createHashHistory());

