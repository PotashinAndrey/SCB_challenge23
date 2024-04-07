import type { FC } from 'react';
import { Children } from 'react';
import { useStoreMap, useUnit } from 'effector-react';
import { Spin, Flex } from 'antd';
import { dashboardDataQuery } from '@context/model/dashboard';
import BoardColumn from './BoardColumn';

const Board: FC = () => {
  const loading = useUnit(dashboardDataQuery.$pending);

  const boardColumns = useStoreMap(dashboardDataQuery.$data, data => (data.processes || [])
    .map(column => <BoardColumn column={column} />)
  );

  return (
    <Spin spinning={loading}>
      <Flex justify="space-around" className="gap-3">
        {Children.toArray(boardColumns)}
      </Flex>
    </Spin>
  );
};

export default Board;
