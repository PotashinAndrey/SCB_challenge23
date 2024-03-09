import { FC, useCallback, useMemo } from 'react';
import { Children } from 'react';
import { useStoreMap } from 'effector-react';
import { Typography } from 'antd';
import { $dashboardDataTasks } from '../context/model/process';
import type { BoardColumnModelType } from '@app/types/model/board';
import BoardTask from './BoardTask';

import '../style/BoardColumn.css';
import { appendHistoryFx } from 'src/context/model/process';
import { UUID } from 'crypto';

const { Text } = Typography;

interface BoardColumnProps {
  column: BoardColumnModelType;
  dashboardId?: UUID;
}

// const items = [{
//   name: "first item",
//   step: "yellow tag",
//   id: "someID4"
// }, {
//   name: "second item",
//   step: "yellow tag",
//   id: "someID5"
// }, {
//   name: "third item",
//   step: "yellow tag",
//   id: "someID6"
// }, {
//   name: "fourth item",
//   step: "yellow tag",
//   id: "someID7"
// }];

const BoardColumn: FC<BoardColumnProps> = (props) => {
  const { column, dashboardId } = props;
  const { name } = column;

  const tasks = useStoreMap({
    store: $dashboardDataTasks,
    fn: (dashboardDataTasks) =>
      dashboardDataTasks.filter((t: any) => t.step === column.id),
    keys: [column],
    defaultValue: [],
  });

  const onDragOverHandler = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = useCallback(
    (event: any) => {
      console.log('taskId', dashboardId, { dashboardId: dashboardId! });
      const columnId = column.id;
      const taskId = event.dataTransfer.getData('taskId');
      appendHistoryFx({ taskId, columnId, dashboardId: dashboardId! });
    },
    [column.id, dashboardId]
  );

  return (
    <div
      className="column-component boxAndRadius"
      onDrop={handleDrop}
      onDragOver={onDragOverHandler}
    >
      <h4 className="column-header">
        <Text>{name}</Text>
        {/* <span>{`${count} / ${total}`}</span> */}
      </h4>

      <div className="column-content">
        {Children.toArray(tasks.map((t: any) => <BoardTask task={t} />))}
      </div>

      {/* todo: убрать это */}
      {/* {!tasks.length && items?.length && <div className="column-content">
        {Children.toArray(items.map(e => <BoardTask task={e} />))}
      </div>} */}
    </div>
  );
};

export default BoardColumn;
