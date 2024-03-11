import { useMemo } from 'react';
import type { FC } from 'react';
import { useStore } from 'effector-react';
import { Button, Input, Select, Space } from 'antd';

import Paper from '../ui/Paper';
import { modalToggler as taskModal } from 'src/context/model/tasks';
import TaskCreate from 'src/popup/TaskCreate';

/** DashboardFilter -  */
const DashboardFilter: FC = () => {
  return (
    <Paper className="flex dashboard-header">
      <Space>
        <Button onClick={() => taskModal.open()} type="primary">
          Добавить задачу
        </Button>
      </Space>
      <TaskCreate />
    </Paper>
  );
};

export default DashboardFilter;
