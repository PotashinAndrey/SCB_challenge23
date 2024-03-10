import { useMemo } from 'react';
import type { FC } from 'react';
import { useStore } from 'effector-react';
import { Button, Input, Select, Space } from 'antd';

import Paper from '../ui/Paper';

/** DashboardFilter -  */
const DashboardFilter: FC = () => {
  return (
    <Paper className="flex dashboard-header">
      <Space>
        <Button onClick={() => {}} type="primary">
          Добавить задачу
        </Button>
      </Space>
    </Paper>
  );
};

export default DashboardFilter;
