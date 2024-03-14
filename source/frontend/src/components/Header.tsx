import type { FC } from 'react';
import { useCallback, useMemo } from 'react';
import { useUnit, useStore } from 'effector-react';
import {
  Menu,
  MenuProps,
  Dropdown,
  message,
  Avatar,
  Space,
  Typography,
  Select
} from 'antd';
import {
  $currentDashboardId,
  $dashboardsList,
  setCurrentDashboardId,
} from 'src/context/model/dashboard';
import { UserOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'atomic-router-react';

import { $user } from '../context/login';
import { routing } from '../context/router';

const { Text } = Typography;

const leftItems: MenuProps['items'] = [
  {
    label: <Link to={routing.dashboard}>Дашборд</Link>,
    key: 'Дашборды',
    // icon: <SmileOutlined />
  },
  {
    key: 'company',
    label: 'Команда',
    children: [
      {
        key: 'projects',
        label: <Link to={routing.projects}>Проекты</Link>,
      },
      {
        key: 'dashboards',
        label: <Link to={routing.dashboards}>Доски</Link>,
      },
    ],
  },
  {
    label: (
      <Space>
        <Text>Дополнительно</Text>
        <DownOutlined />
      </Space>
    ),
    key: 'more',
    // icon: <DownOutlined />, // <SettingOutlined />,
    children: [
      {
        label: <Link to={routing.login}>Страница логина</Link>,
        key: 'login',
      },
      {
        label: <Link to={routing.registration}>Страница регистрации</Link>,
        key: 'register',
      },
      {
        label: <Link to={routing.processCreate}>Создание процесса</Link>,
        key: 'process-create',
      },
      {
        label: <Link to={routing.processesList}>Список процессов</Link>,
        key: 'processes',
      },
    ],
  },
];

type ThemeProps = {
  theme: "light" | "dark";
  changeTheme: (toDark: boolean) => void;
};

const Header: FC<ThemeProps> = props => {
  const { theme, changeTheme } = props;
  const user = useUnit($user);
  const selectedDashboard = useStore($currentDashboardId);
  const dasboardsList = useStore($dashboardsList);

  const dasboardsOptions = useMemo(
    () =>
      dasboardsList.map((e) => ({
        value: e.id,
        label: e.name,
      })),
    [dasboardsList]
  );

  const setCurrentTheme = useCallback(() => changeTheme(theme === "light"), [theme, changeTheme]);

  const items: MenuProps['items'] = [
  {
    label: 'Профиль',
    key: '1',
  },
  {
    label: 'Параметры',
    key: '2',
  },
  {
    label: "Тема",
    key: 'theme',
    onClick: setCurrentTheme
  },
  {
    label: 'Выход из системы',
    key: '3',
  },
];

  return (
    <div className="flex items-center space-between padding margin">
      <div className="flex items-center">
        <Space>
          <Menu mode="horizontal" items={leftItems} disabledOverflow />
          <Text>Дашборд: </Text>
          <Select
            aria-label="sda"
            value={selectedDashboard}
            onChange={setCurrentDashboardId}
            style={{ width: '250px' }}
            options={dasboardsOptions}
          />
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
