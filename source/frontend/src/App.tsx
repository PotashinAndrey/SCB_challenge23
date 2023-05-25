import { createRoutesView, Link } from 'atomic-router-react';
import { routing } from './context/router';
import './App.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CandidateCreate from './pages/CandidateCreate';
import Registration from './pages/Registration';

const App = createRoutesView({
  routes: [
    { route: routing.login,           view: Login },
    { route: routing.registration,    view: Registration },
    { route: routing.dashboard,       view: Dashboard },
    { route: routing.candidateCreate, view: CandidateCreate },
    // { route: Post.route, view: PostPage.view },
  ],
  otherwise() {
    return (
      <div>
        <h2>Page not found!</h2>

        <p><Link to={routing.login}>Login</Link></p>
        <p><Link to={routing.registration}>Registration</Link></p>
        <p><Link to={routing.dashboard}>Dashboard</Link></p>
        <p><Link to={routing.candidateCreate}>Create Candidate</Link></p>
      </div>
    );
  },
});

export default App;
