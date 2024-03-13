import type { FC } from 'react';
import { useCallback, memo } from 'react';
import { Card, Avatar, Descriptions } from 'antd';

import { TaskModel } from '@app/types/model/task';
import { setCurrentTask, taskViewPopup } from 'src/context/model/tasks';

type BoardTaskProps = {
  task: TaskModel;
};
const BoardTask: FC<BoardTaskProps> = ({ task }) => {
  const { title, description } = task;

  const handleDragStart = useCallback(() => {
    localStorage.setItem('movedTask', JSON.stringify(task));
  }, [task]);

  const onCardOpen = () => {
    taskViewPopup.open();
    setCurrentTask(task);
  };

  return (
    <Card
      size="small"
      hoverable
      onClick={onCardOpen}
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
