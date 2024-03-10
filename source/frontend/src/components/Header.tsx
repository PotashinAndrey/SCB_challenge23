import type { FC } from 'react';
import { useMemo } from 'react';
import { useUnit, useStore } from 'effector-react';
import {
  Menu,
  MenuProps,
  Dropdown,
  message,
  Avatar,
  Space,
  Typography,
  Select,
} from 'antd';
import {
  $currentDashboard,
  $dashboardsList,
  setCurrentdashboard,
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

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

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
    label: 'Выход из системы',
    key: '3',
  },
];

const Header: FC = () => {
  const user = useUnit($user);
  const selectedDashboard = useStore($currentDashboard);
  const dasboardsList = useStore($dashboardsList);

  const dasboardsOptions = useMemo(
    () =>
      dasboardsList.map((e) => ({
        value: e.id,
        label: e.name,
      })),
    [dasboardsList]
  );

  return (
    <div className="flex items-center space-between padding margin">
      <div className="flex items-center">
        <Space>
          <Menu mode="horizontal" items={leftItems} disabledOverflow />
          <Text>Дашборд: </Text>
          <Select
            aria-label="sda"
            value={selectedDashboard}
            onChange={setCurrentdashboard}
            style={{ width: '250px' }}
            options={dasboardsOptions}
          />
        </Space>
      </div>

      <Dropdown menu={{ items, onClick }}>
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
