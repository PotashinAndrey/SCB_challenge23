import type { CSSProperties, FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ConfigProvider, theme, App, Layout } from 'antd';
import ApplicationBar from '@component/ApplicationBar';
import type { UIThemeType, UIThemeChangeHandler } from '@app/types/ui';
import RoutesView from './RoutesView';
import PopupsList from './PopupsList';

const { Header, Content } = Layout;

const osColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');
const styleHader: CSSProperties = { display: 'flex', alignItems: 'center', background: 'none' };

const Application: FC = () => {
  const [currentTheme, setCurrentTheme] = useState<UIThemeType>('light');

  const changeTheme = useCallback<UIThemeChangeHandler>(toDark => {
    setCurrentTheme(toDark ? 'dark' : 'light');
    document.documentElement.style.setProperty('--darkmode', toDark ? '1' : '0');
  }, []);

  useEffect(() => {
    const isDarkTheme = osColorSchemeDark.matches;
    changeTheme(isDarkTheme);

    const changeThemeEvent = (e: MediaQueryListEvent) => changeTheme(e.matches);
    osColorSchemeDark.addEventListener('change', changeThemeEvent);
    return () => osColorSchemeDark.removeEventListener('change', changeThemeEvent);
  }, []);

  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        algorithm: currentTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm
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
