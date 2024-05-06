import type { CSSProperties, FC } from 'react';
import { useMemo } from 'react';
import { useStoreMap } from 'effector-react';
import { Menu, MenuProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'atomic-router-react';
import { dashboardsListQuery, dashboardCreatePopup } from '@context/model/dashboard';
import { routing } from '@context/router';
import ProfileShortcut from './auth/ProfileShortcut';

const styleMenu: CSSProperties = { minWidth: 0, flex: "auto", background: "none" };

const createDashboardMenuItems: MenuProps['items'] = [
  {
    type: "divider"
  },
  {
    key: 'dashboard-create',
    icon: <PlusOutlined />,
    label: "Создать дашборд",
    onClick: () => dashboardCreatePopup.open()
  }
];

const ApplicationBar: FC = () => {

  const dasboardsListMenuItems = useStoreMap(dashboardsListQuery.$data, dasboardsList => dasboardsList.map(dashboard => ({
    key: dashboard.id!,
    label: <Link to={routing.dashboard.view} params={{ dashboard: dashboard.id }}>{dashboard.title}</Link>
  })));

  const mainMenuItems: MenuProps['items'] = useMemo(() => [
    {
      label: <Link to={routing.dashboard.list}>Дашборд</Link>,
      key: 'Дашборды',
      children: [
        ...dasboardsListMenuItems,
        ...createDashboardMenuItems
      ]
    },

    {
      key: 'company',
      label: 'Команда',
      children: [
        {
          key: 'projects',
          label: <Link to={routing.project.list}>Проекты</Link>
        },
        {
          key: 'dashboards',
          label: <Link to={routing.dashboard.list}>Доски</Link>
        }
      ]
    }
  ], [dasboardsListMenuItems]);

  return (
    <>
      <Menu
        mode="horizontal"
        items={mainMenuItems}
        style={styleMenu}
        inlineIndent={0}
      />

      <ProfileShortcut />
    </>
  );
};

export default ApplicationBar;
