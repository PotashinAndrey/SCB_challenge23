import type { FC } from 'react';
import { useCallback, useMemo } from 'react';
import { useUnit, useStore } from 'effector-react';
import { Menu, MenuProps, Dropdown, Avatar, Space, Typography, Select, Button } from 'antd';
import { $currentDashboardId, $dashboardsList, createDashboardPopup, setCurrentDashboardId } from 'src/context/model/dashboard';
import { UserOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'atomic-router-react';

import { $currentUser } from '../context/login';
import { routing } from '../context/router';

const { Text } = Typography;

const leftItems: MenuProps['items'] = [
  {
    label: <Link to={routing.dashboard}>Дашборд</Link>,
    key: 'Дашборды'
    // icon: <SmileOutlined />
  },
  {
    key: 'company',
    label: 'Команда',
    children: [
      {
        key: 'projects',
        label: <Link to={routing.projects}>Проекты</Link>
      },
      {
        key: 'dashboards',
        label: <Link to={routing.dashboards}>Доски</Link>
      }
    ]
  }
];

type ThemeProps = {
  theme: 'light' | 'dark';
  changeTheme: (toDark: boolean) => void;
};

const Header: FC<ThemeProps> = (props) => {
  const { theme, changeTheme } = props;
  const user = useUnit($currentUser);
  const selectedDashboard = useStore($currentDashboardId);
  const dasboardsList = useStore($dashboardsList);
  const { open: openCrateDashboardPopup } = useUnit(createDashboardPopup);

  const dasboardsOptions = useMemo(
    () =>
      dasboardsList.map((e) => ({
        value: e.id,
        label: e.name
      })),
    [dasboardsList]
  );

  const setCurrentTheme = useCallback(() => changeTheme(theme === 'light'), [theme, changeTheme]);

  const redirectToLoginPage = () => {
    routing.login.open();
  };

  const redirectToRegistrationPage = () => {
    routing.registration.open();
  };

  const items: MenuProps['items'] = [
    {
      label: 'Профиль',
      key: '1'
    },
    {
      label: 'Параметры',
      key: '2'
    },
    {
      label: 'Войти в другой аккаунт',
      key: '3',
      onClick: redirectToLoginPage
    },
    {
      label: 'Регистрация',
      key: '4',
      onClick: redirectToRegistrationPage
    },
    {
      label: 'Тема',
      key: 'theme',
      onClick: setCurrentTheme
    }
  ];

  return (
    <div className="flex items-center space-between padding margin">
      <div className="flex items-center">
        <Space>
          <Menu mode="horizontal" items={leftItems} disabledOverflow />
          <Select aria-label="sda" value={selectedDashboard} onChange={setCurrentDashboardId} style={{ width: '250px' }} options={dasboardsOptions} />
          <Button icon={<PlusOutlined />} onClick={openCrateDashboardPopup} />
        </Space>
      </div>

      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Text>{user.name}</Text>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Header;
