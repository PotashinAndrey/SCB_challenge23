import type { FC } from 'react';
import { useStore, useUnit } from 'effector-react';
import { Modal, Typography } from 'antd';
import { $currentTask, taskViewPopup } from '../context/model/tasks';

const { Text } = Typography;

const TaskViewPopup: FC = () => {
  const task = useStore($currentTask);
  const { visible, close } = useUnit(taskViewPopup);

  return (
    <Modal
      destroyOnClose
      open={visible}
      width={800}
      closable
      onCancel={() => close()}
      title={task.title}
      footer={[]}
    >
      <div>{task.description}</div>
    </Modal>
  );
};

export default TaskViewPopup;
