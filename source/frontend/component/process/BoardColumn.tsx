import type { FC } from 'react';
import { useCallback, Children } from 'react';
import { useStoreMap } from 'effector-react';
import { Card } from 'antd';
import { appendHistory } from '@context/model/history';
import { dashboardDataQuery } from '@context/model/dashboard';
import { updateTask } from '@context/model/task';
import type { ProcessProps } from '@app/types/model/process';
import BoardTask from '../task/BoardTask';
import { preventDefault } from '../../scripts/ui-utils';

const BoardColumn: FC<ProcessProps> = props => {
  const { process } = props;
  const { title } = process;

  const tasks = useStoreMap({
    store: dashboardDataQuery.$data,
    fn: dashboard => (dashboard.tasks || []).filter(t => t.process === process.id),
    keys: [process],
    defaultValue: []
  });

  const handleDrop = useCallback(() => {
      const newColumnId = process.id;
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
    [process.id]
  );

  return (
    <Card title={title} type="inner" onDrop={handleDrop} onDragOver={preventDefault} style={{ width: 300 }}>
      {Children.toArray(tasks.map(t => <BoardTask task={t} />))}
    </Card>
  );
};

export default BoardColumn;
