import type { FC } from 'react';
import { Button, Space } from 'antd';
import { createTaskPopup, setCurrentTask } from '@context/model/task';
import Paper from '@ui/Paper';

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
          Создать задачу
        </Button>
        <Button type="link">редактировать дашборд</Button>
      </Space>
    </Paper>
  );
};

export default DashboardFilter;
