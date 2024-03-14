import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { createRoutesView, Link } from 'atomic-router-react';
import { ConfigProvider, theme, App } from 'antd';
import { routing } from '@context/router';
import Header from '../components/Header';

import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';
import Projects from './Projects';
import ProcessCreate from './ProcessCreate';
import Processes from './Processes';
import PopupsList from './PopupsList';
import Dashboards from './Dashboards';

const RoutesView = createRoutesView({
  routes: [
    { route: routing.login, view: Login },
    { route: routing.registration, view: Registration },
    { route: routing.dashboard, view: Dashboard },
    { route: routing.processCreate, view: ProcessCreate },
    { route: routing.processesList, view: Processes },
    { route: routing.projects, view: Projects },
    { route: routing.dashboards, view: Dashboards },
    // { route: Post.route, view: PostPage.view },
  ],
  otherwise() {
    return (
      <div>
        <h2>Page not found!</h2>

        <p>
          <Link to={routing.login}>Login</Link>
        </p>
        <p>
          <Link to={routing.registration}>Registration</Link>
        </p>
        <p>
          <Link to={routing.dashboard}>Dashboard</Link>
        </p>
        <p>
          <Link to={routing.processesList}>Список процессов</Link>
        </p>
        <p>
          <Link to={routing.processCreate}>Создание процесса</Link>
        </p>
        <p>
          <Link to={routing.projects}>Проекты</Link>
        </p>
      </div>
    );
  },
});

const Application: FC = () => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const changeTheme = useCallback((toDark: boolean) => {
    setCurrentTheme(toDark ? "dark" : "light");
    document.documentElement.style.setProperty('--darkmode', toDark ? "1" : "0");
  }, []);

  useEffect(() => {
    const isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    changeTheme(isDarkTheme);

    const changeThemeEvent = (e: MediaQueryListEvent) => changeTheme(e.matches);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", changeThemeEvent);
    return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener("change", changeThemeEvent);
  }, []);

  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        algorithm: currentTheme === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm // [theme.darkAlgorithm, theme.compactAlgorithm]
      }}
    >
      <App>
        <div className="application">
          <Header theme={currentTheme} changeTheme={changeTheme} />
          <RoutesView />
          <PopupsList />
        </div>
      </App>
    </ConfigProvider >
  );
};

export default Application;
