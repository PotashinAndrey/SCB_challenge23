import type { FC } from 'react';
import { useUnit } from 'effector-react';
import { Modal, Button } from 'antd';
import { taskCreatePopup, taskCreateForm } from '@context/model/task';
import TaskCreate from '@page/task/TaskCreate';

const TaskCreatePopup: FC = () => {
  const { visible, close } = useUnit(taskCreatePopup);

  return (
    <Modal
      destroyOnClose
      open={visible}
      width={900}
      closable
      onCancel={close}
      title="Создание новой задачи"
      footer={[
        <Button key="close" type="text" onClick={() => {
          taskCreateForm.reset();
          close();
        }}>Отмена</Button>,
        <Button type="primary" key="create" onClick={() => taskCreateForm.submit()}>Создать</Button>
      ]}
    >
      <TaskCreate />
    </Modal>
  );
};

export default TaskCreatePopup;
