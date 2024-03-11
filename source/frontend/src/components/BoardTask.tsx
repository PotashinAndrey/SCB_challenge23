import type { FC } from 'react';
import { useCallback, memo } from 'react';
import { Card, Avatar, Descriptions } from 'antd';

import { TaskModel } from '@app/types/model/task';

type BoardTaskProps = {
  task: TaskModel;
};
const BoardTask: FC<BoardTaskProps> = ({ task }) => {
  const { title, description } = task;

  const handleDragStart = useCallback(() => {
    localStorage.setItem('movedTask', JSON.stringify(task));
  }, [task]);

  return (
    <Card
      size="small"
      hoverable
      onClick={() => console.log('TODO OPEN CREATE TASK POPUP')}
      onDragStart={handleDragStart}
      draggable
      className="w-card"
    >
      <Card.Meta
        avatar={
          // TODO Тут отображать исполнителя
          <Avatar
            size={30}
            src={
              'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1&' + Math.random()
            }
          />
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

export default memo(BoardTask);
