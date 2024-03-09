import { useMemo } from "react";
import type { FC } from "react";
import { useStore } from "effector-react";
import { Button, Input, Select, Space } from 'antd';
import { DashboardModel } from "@app/types/model/dashboard";

import Paper from "../ui/Paper";
import { $currentDashboard, $dashboardsList, setCurrentdashboard } from "src/context/model/dashboard";

const { Search } = Input;

/** DashboardFilter -  */
const DashboardFilter: FC = () => {
  const dasboardsList = useStore<DashboardModel[]>($dashboardsList)
  const selectedDashboard = useStore($currentDashboard)

  const dasboardsOptions = useMemo(() => dasboardsList.map(e => ({
    value: e.id, label: e.name
  })), [dasboardsList]);

  return (
    <Paper className="flex dashboard-header">
      <Space>
        <Button onClick={() => {}} type="primary">Добавить</Button>
        <Select
          value={selectedDashboard}
          onChange={setCurrentdashboard}
          style={{width: '250px'}}
          options={dasboardsOptions}
        />
      </Space>
    </Paper>
  );
};

export default DashboardFilter;
