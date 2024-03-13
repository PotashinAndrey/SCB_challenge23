import { FC, useCallback } from 'react';
import { Children } from 'react';
import { useStoreMap } from 'effector-react';
import { Typography } from 'antd';
import { $dashboardDataTasks } from '../context/model/process';
import type { BoardColumnModelType } from '@app/types/model/board';
import BoardTask from './BoardTask';

import '../style/BoardColumn.css';
import { appendHistory } from 'src/context/model/history';
import { updateTask } from 'src/context/model/tasks';
import { UUID } from 'crypto';

const { Text } = Typography;

interface BoardColumnProps {
  column: BoardColumnModelType;
  dashboardId?: UUID;
}

const BoardColumn: FC<BoardColumnProps> = (props) => {
  const { column, dashboardId } = props;
  const { name } = column;

  const tasks = useStoreMap({
    store: $dashboardDataTasks,
    fn: (dashboardDataTasks) =>
      dashboardDataTasks.filter((t: any) => t.process === column.id),
    keys: [column],
    defaultValue: [],
  });

  const onDragOverHandler = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = useCallback(
    (event: any) => {
      const newColumnId = column.id;
      // TODO Подумать как нормально сделать
      const movedTask = JSON.parse(localStorage.getItem('movedTask') || '');
      localStorage.removeItem('movedTask');
      const taskId = movedTask.id;
      const oldColumnId = movedTask.process;
      // TODO Нужно еще поменять порядок карточек
      updateTask({
        ...movedTask,
        process: newColumnId,
      });
      if (oldColumnId !== newColumnId) {
        appendHistory({
          taskId,
          oldColumnId,
          newColumnId,
        });
      }
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
      </h4>

      <div className="column-content">
        {Children.toArray(tasks.map((t: any) => <BoardTask task={t} />))}
      </div>
    </div>
  );
};

export default BoardColumn;
