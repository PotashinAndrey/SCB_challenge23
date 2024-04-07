import type { FC } from 'react';
import { useCallback, Children } from 'react';
import { useStoreMap } from 'effector-react';
import { Card } from 'antd';
import { appendHistory } from '@context/model/history';
import { dashboardDataQuery } from '@context/model/dashboard';
import { updateTask } from '@context/model/task';
import type { BoardColumnModelType } from '@app/types/model/board';
import BoardTask from './BoardTask';

const preventDefault = (event: any) => event.preventDefault();

type BoardColumnProps = { column: BoardColumnModelType };

const BoardColumn: FC<BoardColumnProps> = props => {
  const { column } = props;
  const { name } = column;

  const tasks = useStoreMap({
    store: dashboardDataQuery.$data,
    fn: dashboard => (dashboard.tasks || []).filter((t: any) => t.process === column.id),
    keys: [column],
    defaultValue: []
  });

  const handleDrop = useCallback((event: any) => {
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
    [column.id]
  );

  return (
    <Card title={name} type="inner" onDrop={handleDrop} onDragOver={preventDefault} style={{ width: 300 }}>
      {Children.toArray(tasks.map((t: any) => <BoardTask task={t} />))}
    </Card>
  );
};

export default BoardColumn;
