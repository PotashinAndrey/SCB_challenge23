import type { FC } from 'react';
import { Button, Space } from 'antd';
import { taskCreatePopup } from '@context/model/task';
import Paper from '@ui/Paper';

/** DashboardFilter -  */
const DashboardFilter: FC = () => {
  return (
    <Paper className="flex dashboard-header">
      <Space>
        <Button
          onClick={() => taskCreatePopup.open()}
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
