import type { FC } from 'react';
import { createRoutesView, Link } from 'atomic-router-react';
import { routing } from '../context/router';
import Header from '../components/Header';

import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';
import Candidates from './Candidates';
import CandidateCreate from './CandidateCreate';
import CalendarPage from "./Calendar";
import Vacancies from './Vacancies';
import Departments from './Departments';
import ProcessCreate from './ProcessCreate';
import Processes from './Processes';
import PopupsList from './PopupsList';

const RoutesView = createRoutesView({
  routes: [
    { route: routing.login,           view: Login },
    { route: routing.registration,    view: Registration },
    { route: routing.dashboard,       view: Dashboard },
    { route: routing.processCreate,   view: ProcessCreate },
    { route: routing.processesList,   view: Processes },
    { route: routing.candidateList,   view: Candidates },
    { route: routing.candidateCreate, view: CandidateCreate },
    { route: routing.calendar,        view: CalendarPage },
    { route: routing.vacancies,       view: Vacancies },
    { route: routing.departments,     view: Departments }
    // { route: Post.route, view: PostPage.view },
  ],
  otherwise() {
    return (
      <div>
        <h2>Page not found!</h2>

        <p><Link to={routing.login}>Login</Link></p>
        <p><Link to={routing.registration}>Registration</Link></p>
        <p><Link to={routing.dashboard}>Dashboard</Link></p>
        <p><Link to={routing.processesList}>Список процессов</Link></p>
        <p><Link to={routing.processCreate}>Создание процесса</Link></p>
        <p><Link to={routing.candidateList}>Candidates list</Link></p>
        <p><Link to={routing.candidateCreate}>Create Candidate</Link></p>
        <p><Link to={routing.calendar}>Calendar</Link></p>
        <p><Link to={routing.vacancies}>Vacancies</Link></p>
        <p><Link to={routing.departments}>Departments</Link></p>
      </div>
    );
  },
});

const App: FC = () => {
  return (
    <div className="application">
      <Header />
      <RoutesView />
      <PopupsList />
    </div>
  );
}

export default App;
