import type { FC } from 'react';
import { useCallback } from 'react';
import { Card, Avatar, Descriptions } from 'antd';
import { taskViewPopup } from '@context/model/task';
import type { TaskProps } from '@app/types/model/task';

const BoardTask: FC<TaskProps> = props => {
  const { task } = props;
  const { title, description } = task;

  const handleTaskOpen = useCallback(() => taskViewPopup.open(task), [task]);

  const handleDragStart = useCallback(() => {
    localStorage.setItem('movedTask', JSON.stringify(task));
  }, [task]);

  return (
    <Card size="small" hoverable onClick={handleTaskOpen} onDragStart={handleDragStart} draggable className="w-card mb-2">
      <Card.Meta
        avatar={
          // TODO Тут отображать исполнителя
          <Avatar size={30} src={'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1&' + Math.random()} />
        }
        title={title}
      />

      <div className="mt-4">
        <Descriptions size="small">
          <Descriptions.Item>{description}</Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default BoardTask;
