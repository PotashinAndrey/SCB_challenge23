import type { FC } from "react";
import { useMemo } from "react";
import { useUnit } from 'effector-react';
import type { MenuProps } from 'antd';
import { Dropdown, Avatar, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { routing } from '@context/router';
import { $currentUser, logoutUserEvent } from '@context/login';
import type { UIThemeProps } from "@app/types/ui";

const { Text } = Typography;

/** ProfileShortcut - */
const ProfileShortcut: FC<UIThemeProps> = props => {
  const { theme, changeTheme } = props;
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
        onClick: () => routing.registration.open()
      },
      {
        label: 'Тема',
        key: 'theme',
        onClick: () => changeTheme(theme === 'light')
      }
    ];
    return { items };
  }, [theme, changeTheme, user]);

  return (
    <Dropdown menu={menu}>
      <a onClick={e => e.preventDefault()}>
        <Space>
          <Text>{user.name}</Text>
          <Avatar icon={<UserOutlined />} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default ProfileShortcut;
