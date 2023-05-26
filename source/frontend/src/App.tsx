import type { FC } from 'react';
import { createRoutesView, Link } from 'atomic-router-react';
import { routing } from './context/router';
import Header from './components/Header';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CandidateCreate from './pages/CandidateCreate';
import CalendarItem from "./components/Calendar";
import Registration from './pages/Registration';

const RoutesView = createRoutesView({
  routes: [
    { route: routing.login,           view: Login },
    { route: routing.registration,    view: Registration },
    { route: routing.dashboard,       view: Dashboard },
    { route: routing.candidateCreate, view: CandidateCreate },
    { route: routing.calendar,        view: CalendarItem },
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
        {/* <Menu></Menu> */}
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
    </div>
  );
}

export default App;
