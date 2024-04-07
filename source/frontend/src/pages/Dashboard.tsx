import type { FC } from 'react';
import { useMemo } from 'react';
import { useUnit } from 'effector-react';
import { Link } from 'atomic-router-react';
import { Breadcrumb, Space } from 'antd';
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { routing } from '@context/router';
import { dashboardsListQuery } from '@context/model/dashboard';
import DashboardFilter from '@component/DashboardFilter';
import Board from '@component/Board';

const Dashboard: FC = () => {
  const { data: dashboards } = useUnit(dashboardsListQuery);
  const { dashboard: id } = useUnit(routing.dashboard.view.$params);

  const breadcrumbs = useMemo(() => {
    const name = dashboards.find(dashboard => dashboard.id === id)?.name;

    return [
      { href: '/', title: <HomeOutlined /> },
      { title: <Link to={routing.dashboard.list}>Dashboards</Link> },
      { title: <Space><AppstoreOutlined />{name}</Space> }
    ];
  }, [dashboards, id]);

  return (
    <div>
      <Breadcrumb items={breadcrumbs} />
      <DashboardFilter />
      <Board />
    </div>
  );
};

export default Dashboard;
