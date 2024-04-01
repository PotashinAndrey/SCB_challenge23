import type { CSSProperties, FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ConfigProvider, theme, App, Layout } from 'antd';
import ApplicationBar from '@component/ApplicationBar';
import RoutesView from './RoutesView';
import PopupsList from './PopupsList';

const { Header, Content } = Layout;

const styleHader: CSSProperties = { display: 'flex', alignItems: 'center', background: 'none' };

const Application: FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const changeTheme = useCallback((toDark: boolean) => {
    setCurrentTheme(toDark ? 'dark' : 'light');
    document.documentElement.style.setProperty('--darkmode', toDark ? '1' : '0');
  }, []);

  useEffect(() => {
    const isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    changeTheme(isDarkTheme);

    const changeThemeEvent = (e: MediaQueryListEvent) => changeTheme(e.matches);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', changeThemeEvent);
    return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', changeThemeEvent);
  }, []);

  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        algorithm: currentTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm // [theme.darkAlgorithm, theme.compactAlgorithm]
      }}
    >
      <App>
        <Layout>
          <Header style={styleHader}>
            <ApplicationBar theme={currentTheme} changeTheme={changeTheme} />
          </Header>
          <Content>
            <RoutesView />
          </Content>
        </Layout>

        <PopupsList />
      </App>
    </ConfigProvider>
  );
};

export default Application;
