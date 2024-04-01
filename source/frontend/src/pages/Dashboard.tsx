import { FC, useEffect } from 'react';

import DashboardFilter from '@component/DashboardFilter';
import Board from '@component/Board';
import { fetchDashboardsList } from 'src/context/model/dashboard';

const Dashboard: FC = () => {
  useEffect(() => {
    fetchDashboardsList();
  }, []);

  return (
    <div>
      <DashboardFilter />
      <Board />
    </div>
  );
};

export default Dashboard;
