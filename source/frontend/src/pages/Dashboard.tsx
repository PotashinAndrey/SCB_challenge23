import type { FC } from "react";

import "../style/Dashboard.css";
// import Board from "../components/Board";

import DashboardFilter from "../components/DashboardFilter";
import Board from "src/components/Board";

const Dashboard: FC = () => {

  return (
    // <div className="dashboard-component">
    //   <Board columns={columns} />
    // </div>
    <div>
      <DashboardFilter />
      <Board />

    </div>
  );
}

export default Dashboard;
