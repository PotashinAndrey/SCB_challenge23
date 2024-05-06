import type { FC } from "react";
import { useMemo } from "react";
import { useUnit } from 'effector-react';
import type { MenuProps } from 'antd';
import { Dropdown, Avatar, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { routing } from '@context/router';
import { $currentUser, logoutUserEvent } from '@context/login';
import useColorTheme from '@hook/useColorTheme';
import { preventDefault } from '../../scripts/ui-utils';

const { Text } = Typography;

/** ProfileShortcut - */
const ProfileShortcut: FC = () => {
  const { appThemeToggle } = useColorTheme();
  const user = useUnit($currentUser);

  const menu = useMemo(() => {
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
        label: 'Выйти',
        key: '3',
        onClick: () => () => {
          if (!user?.id) return;
          logoutUserEvent(user.id);
        }
      },
      {
        label: 'Регистрация',
        key: '4',
        onClick: () => routing.auth.registration.open()
      },
      {
        label: 'Тема',
        key: 'theme',
        onClick: appThemeToggle
      }
    ];
    return { items };
  }, [appThemeToggle, user]);

  return (
    <Dropdown menu={menu}>
      <a onClick={preventDefault}>
        <Space>
          <Text>{user.name}</Text>
          <Avatar icon={<UserOutlined />} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default ProfileShortcut;
