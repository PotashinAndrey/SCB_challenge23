import type { FC, CSSProperties } from 'react';
import { useMemo } from 'react';
import { ConfigProvider, theme, App, Layout } from 'antd';
import ApplicationBar from '@component/ApplicationBar';
import useColorTheme from '@hook/useColorTheme';
import RoutesView from './RoutesView';
import PopupsList from './PopupsList';

const { Header, Content } = Layout;
const styleHader: CSSProperties = { display: 'flex', alignItems: 'center', background: 'none' };

const Application: FC = () => {
  const { appTheme } = useColorTheme();

  const themeConfig = useMemo(() => ({
    cssVar: true,
    algorithm: appTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm
  }), [appTheme]);

  return (
    <ConfigProvider theme={themeConfig}>
      <App>
        <Layout>
          <Header style={styleHader}>
            <ApplicationBar />
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
