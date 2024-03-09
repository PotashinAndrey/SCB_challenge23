import { FC, useEffect } from 'react';

import DashboardFilter from '../components/DashboardFilter';
import Board from '../components/Board';
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
