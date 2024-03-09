import type { FC } from "react";
import { useState } from "react";
import { Input, Button, Select, Space } from 'antd';
const { Search } = Input;

import Paper from "../ui/Paper";
import { useStore } from "effector-react";
import { $currentDashboard, $dashboardsList, setCurrentdashboard } from "src/context/model/dashboard";

/** DashboardFilter -  */
const DashboardFilter: FC = () => {
  const dasboardsList = useStore($dashboardsList)
  const selectedDashboard = useStore($currentDashboard)

  return (
    <Paper className="flex dashboard-header">
      <Space>
        <Select
          value={selectedDashboard}
          onChange={setCurrentdashboard}
          style={{width: '250px'}}
          options={dasboardsList.map(item => ({value: item.id, label: item.name}))}
        />
      </Space>
    </Paper>
  );
};

export default DashboardFilter;
