import type { CSSProperties, FC } from 'react';
import { useMemo } from 'react';
import { useStoreMap } from 'effector-react';
import { Menu, MenuProps } from 'antd';
import { $dashboardsList, createDashboardPopup, setCurrentDashboardId } from 'src/context/model/dashboard';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'atomic-router-react';
import type { UIThemeProps } from '@app/types/ui';
import { routing } from '@context/router';
import ProfileShortcut from './ProfileShortcut';

const styleMenu: CSSProperties = { minWidth: 0, flex: "auto", background: "none" };

const createDashboardMenuItems: MenuProps['items'] = [
  {
    type: "divider"
  },
  {
    key: 'dashboard-create',
    icon: <PlusOutlined />,
    label: "Создать дашборд",
    onClick: () => createDashboardPopup.open()
  }
];

const ApplicationBar: FC<UIThemeProps> = props => {
  const dasboardsListMenuItems = useStoreMap($dashboardsList, dasboardsList => dasboardsList.map(dashboard => ({
    key: dashboard.id!,
    label: dashboard.name,
    onClick: () => setCurrentDashboardId(dashboard.id!)
  })));

  const mainMenuItems: MenuProps['items'] = useMemo(() => [
    {
      label: <Link to={routing.dashboard}>Дашборд</Link>,
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
          label: <Link to={routing.projects}>Проекты</Link>
        },
        {
          key: 'dashboards',
          label: <Link to={routing.dashboards}>Доски</Link>
        }
      ]
    }
  ], [dasboardsListMenuItems]);

  // const [current, setCurrent] = useState('mail');

  // const onClick: MenuProps['onClick'] = (e) => {
  //   console.log('click ', e);
  //   setCurrent(e.key);
  // };

  return (
    <>
      <Menu
        mode="horizontal"
        items={mainMenuItems}
        style={styleMenu}
        inlineIndent={0}
        // onClick={onClick}
        // selectedKeys={[current]}
      />

      <ProfileShortcut {...props} />
    </>
  );
};

export default ApplicationBar;
