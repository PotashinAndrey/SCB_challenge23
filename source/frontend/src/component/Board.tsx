import type { FC } from 'react';
import { useUnit, useList } from 'effector-react';
import { Spin, Flex } from 'antd';
import { dashboardDataQuery } from '@context/model/dashboard';
import { $processes } from '@context/model/process';
import BoardColumn from './BoardColumn';

const Board: FC = () => {
  const loading = useUnit(dashboardDataQuery.$pending);

  const processes = useList(
    $processes,
    process => <BoardColumn process={process} />
  );

  return (
    <Spin spinning={loading}>
      <Flex justify="space-around" className="gap-3">
        {processes}
      </Flex>
    </Spin>
  );
};

export default Board;
