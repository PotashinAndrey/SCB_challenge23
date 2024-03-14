import { FC, useState, useReducer, useEffect, ChangeEvent } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useStore, useUnit } from 'effector-react';
import { Button, Flex, Input, Modal, Space, Typography } from 'antd';
import { $currentTask, taskViewPopup, updateTask } from '../context/model/tasks';
import { TaskModel } from '@app/types/model/task';

const reducer = (state: TaskModel, payload: Partial<TaskModel>): TaskModel => {
  return { ...state, ...payload };
};

const TaskViewPopup: FC = () => {
  const task = useStore($currentTask);
  const { visible, close } = useUnit(taskViewPopup);
  const [isEditing, setIsEditing] = useState(false);
  const [editableTask, dispatchTaskEdit] = useReducer(reducer, { ...task });

  useEffect(() => {
    dispatchTaskEdit({ ...task });
  }, [task]);

  const onTitleReset = () => {
    dispatchTaskEdit({ ...task });
    setIsEditing(false);
  };

  const onTitleSave = () => {
    updateTask(editableTask);
    setIsEditing(false);
  };

  const getModalTitle = () => {
    return isEditing ? (
      <Flex>
        <Space>
          <Input
            value={editableTask.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              dispatchTaskEdit({ title: value });
            }}
            style={{ width: '400px' }}
          />
          <Button type="dashed" icon={<CloseOutlined />} onClick={onTitleReset}></Button>
          <Button type="primary" icon={<CheckOutlined />} onClick={onTitleSave}></Button>
        </Space>
      </Flex>
    ) : (
      <div style={{ margin: '4px 0 12px 0' }} onClick={() => setIsEditing(true)}>
        {task.title}
      </div>
    );
  };

  return (
    <Modal
      destroyOnClose
      open={visible}
      width={800}
      closable
      onCancel={() => close()}
      title={getModalTitle()}
      footer={[]}
    >
      <div>{task.description}</div>
    </Modal>
  );
};

export default TaskViewPopup;
