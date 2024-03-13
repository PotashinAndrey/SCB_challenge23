import type { FC } from 'react';
import { Button, Space } from 'antd';

import Paper from '../ui/Paper';
import { createTaskPopup, setCurrentTask } from 'src/context/model/tasks';
import TaskCreatePopup from 'src/popup/TaskCreatePopup';

/** DashboardFilter -  */
const DashboardFilter: FC = () => {
  return (
    <Paper className="flex dashboard-header">
      <Space>
        <Button
          onClick={() => {
            createTaskPopup.open();
          }}
          type="primary"
        >
          Добавить задачу
        </Button>
      </Space>
      <TaskCreatePopup />
    </Paper>
  );
};

export default DashboardFilter;
