import type { FC } from "react";
import { useState } from "react";
import { Input, Button, Select, Space } from 'antd';
const { Search } = Input;

import Paper from "../ui/Paper";
import { useStore } from "effector-react";
import { $currentDashboard, $dashboardsList, setCurrentdashboard } from "src/context/model/dashboard";

// interface DashboardFilterProps {
//   : ;
//   test?: string;
// }

/** DashboardFilter -  */
const DashboardFilter: FC = () => {
  const dasboardsList = useStore($dashboardsList)
  const selectedDashboard = useStore($currentDashboard)

  return (
    <Paper className="flex dashboard-header">
      <Space>
        />
      </Space>
    </Paper>
  );
};

export default DashboardFilter;
