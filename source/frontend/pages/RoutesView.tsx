import { createRoutesView, Link } from 'atomic-router-react';
import { routing } from '@context/router';

import Login from './auth/Login';
import Registration from './auth/Registration';
import Forbidden from './auth/Forbidden';

import Dashboard from './dashboard/Dashboard';
import Projects from './project/Projects';
import ProcessCreate from './process/ProcessCreate';
import Processes from './process/Processes';
import Dashboards from './dashboard/Dashboards';

const RoutesView = createRoutesView({
  routes: [
    { route: routing.auth.login, view: Login },
    { route: routing.auth.registration, view: Registration },

    { route: routing.dashboard.list, view: Dashboards },
    { route: routing.dashboard.view, view: Dashboard },

    { route: routing.processCreate, view: ProcessCreate },
    { route: routing.processesList, view: Processes },
    { route: routing.project.list, view: Projects },
    { route: routing.forbidden, view: Forbidden }
  ],

  otherwise() {
    return (
      <div>
        <h2>Page not found!</h2>

        <p><Link to={routing.auth.login}>Login</Link></p>
        <p><Link to={routing.auth.registration}>Registration</Link></p>
        <p><Link to={routing.dashboard.list}>Dashboards</Link></p>
        <p><Link to={routing.processesList}>Список процессов</Link></p>
        <p><Link to={routing.processCreate}>Создание процесса</Link></p>
        <p><Link to={routing.project.list}>Проекты</Link></p>
      </div>
    );
  }
});

export default RoutesView;
