import { createRoutesView, Link } from 'atomic-router-react';
import { routing } from './context/router';
import './App.css';

import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { CandidateInfo } from './components/CandidateInfo';

const App = createRoutesView({
  routes: [
    { route: routing.login,     view: Login },
    { route: routing.dashboard, view: Dashboard },
    { route: routing.candidate, view: CandidateInfo },
    // { route: Post.route, view: PostPage.view },
  ],
  otherwise() {
    return (
      <div>
        <h2>Page not found!</h2>

        <p><Link to={routing.login}>Login</Link></p>
        <p><Link to={routing.dashboard}>Dashboard</Link></p>
        <p><Link to={routing.candidate}>Candidate</Link></p>
      </div>
    );
  },
});

export default App;
