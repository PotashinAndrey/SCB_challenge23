import type { FC } from "react";
import { useUnit } from 'effector-react';
import { Modal } from 'antd';
import { taskViewPopup } from '@context/model/task';
import EditableTaskTitle from '@component/task/EditableTaskTitle';
import Task from '@page/Task';

const TaskViewPopup: FC = () => {
  const { visible, close } = useUnit(taskViewPopup);

  return (
    <Modal
      destroyOnClose
      open={visible}
      width={900}
      closable
      onCancel={close}
      title={<EditableTaskTitle />}
      footer={null}
      // footer={[
      //   <Button key="close" type="text" onClick={close}>Закрыть</Button>,
      //   <Button key="save" type="primary" onClick={close}>Сохранить</Button>
      // ]}
    >
      <Task />
    </Modal>
  );
};

export default TaskViewPopup;
