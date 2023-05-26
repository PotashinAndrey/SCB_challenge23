import type { FC } from "react";

import DashboardFilter from "../components/DashboardFilter";
import Board from "src/components/Board";

const Dashboard: FC = () => {

  return (
    <div>
      <DashboardFilter />
      <Board />
    </div>
  );
}

export default Dashboard;
