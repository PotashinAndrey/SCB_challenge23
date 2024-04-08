import type { FC } from 'react';
import { useUnit, useList, useStoreMap } from 'effector-react';
import { Spin, Flex } from 'antd';
import { dashboardDataQuery } from '@context/model/dashboard';
import { $processes } from '@context/model/process';
import BoardColumn from './BoardColumn';

const Board: FC = () => {
  const loading = useUnit(dashboardDataQuery.$pending);
  const data = useUnit(dashboardDataQuery.$data);
  // const length = useStoreMap($processes, processes => processes.length > 0)

  const processes = useList(
    $processes,
    process => <BoardColumn process={process} />
  );

  return (
    // <Spin spinning={!Boolean(data) && loading}>
      <Flex justify="space-around" className="gap-3">
        {processes}
      </Flex>
    // </Spin>
  );
};

export default Board;
