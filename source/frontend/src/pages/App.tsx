import type { FC } from 'react';
import { createRoutesView, Link } from 'atomic-router-react';
import { routing } from '../context/router';
import Header from '../components/Header';

import Login from './Login';
import Dashboard from './Dashboard';
import CandidateCreate from './CandidateCreate';
import CalendarPage from "./Calendar";
import Registration from './Registration';
import Vacancies from 'src/components/Vacancies';
import Department from 'src/components/Departments';

import ApplicantProcessPopup from '../popup/ApplicantProcessPopup';
import CandidateProcessPopup from '../popup/CandidateProcessPopup';
import Candidates from 'src/components/Candidates';

const RoutesView = createRoutesView({
  routes: [
    { route: routing.login,           view: Login },
    { route: routing.registration,    view: Registration },
    { route: routing.dashboard,       view: Dashboard },
    { route: routing.candidateCreate, view: Candidates },
    { route: routing.calendar,        view: CalendarPage },
    { route: routing.vacancies,       view: Vacancies },
    { route: routing.departments,       view: Department }
    // { route: Post.route, view: PostPage.view },
  ],
  otherwise() {
    return (
      <div>
        <h2>Page not found!</h2>

        <p><Link to={routing.login}>Login</Link></p>
        <p><Link to={routing.calendar}>Calendar</Link></p>
        <p><Link to={routing.registration}>Registration</Link></p>
        <p><Link to={routing.dashboard}>Dashboard</Link></p>
        <p><Link to={routing.candidateCreate}>Create Candidate</Link></p>
      </div>
    );
  },
});

const App: FC = () => {
  return (
    <div className="application">
      <Header />
      <RoutesView />
      {/* Popups */}
      <ApplicantProcessPopup />
      <CandidateProcessPopup/>
    </div>
  );
}

export default App;
