import type { UUID } from 'crypto';
import { type FC, useCallback, Children } from 'react';
import { useStoreMap } from 'effector-react';
import { Typography, Card } from 'antd';
import { appendHistory } from '@context/model/history';
import { updateTask } from '@context/model/tasks';
import { $dashboardDataTasks } from '@context/model/process';
import type { BoardColumnModelType } from '@app/types/model/board';
import BoardTask from './BoardTask';

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
    fn: (dashboardDataTasks) => dashboardDataTasks.filter((t: any) => t.process === column.id),
    keys: [column],
    defaultValue: []
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
        process: newColumnId
      });
      if (oldColumnId !== newColumnId) {
        appendHistory({
          taskId,
          oldColumnId,
          newColumnId
        });
      }
    },
    [column.id, dashboardId]
  );

  return (
    <Card title={name} type="inner" style={{ width: 300 }} onDrop={handleDrop} onDragOver={onDragOverHandler}>
      {Children.toArray(tasks.map((t: any) => <BoardTask task={t} />))}
    </Card>
  );
};

export default BoardColumn;
