import { FC, useState, useReducer, useEffect, ChangeEvent, useCallback } from 'react';
import { useStore, useUnit } from 'effector-react';
import { Modal } from 'antd';
import { $currentTask, taskViewPopup, updateTask } from '../context/model/tasks';
import { TaskModel } from '@app/types/model/task';
import { EditableTaskTitle } from './TaskViewPopup/EditableTaskTitle';
import { EditableTaskDescription } from './TaskViewPopup/EditableTaskDescription';

const reducer = (state: TaskModel, payload: Partial<TaskModel>): TaskModel => {
  return { ...state, ...payload };
};

const TaskViewPopup: FC = () => {
  const task = useStore($currentTask);
  const { visible, close } = useUnit(taskViewPopup);
  const [editableTask, dispatchTaskEdit] = useReducer(reducer, { ...task });

  useEffect(() => {
    dispatchTaskEdit({ ...task });
  }, [task]);

  const onReset = useCallback(() => {
    dispatchTaskEdit({ ...task });
  }, [task, dispatchTaskEdit])

  const onSave = useCallback(() => {
    updateTask(editableTask);
  }, [editableTask]);

  return (
    <Modal
      destroyOnClose
      open={visible}
      width={800}
      closable
      onCancel={() => close()}
      title={
        <EditableTaskTitle
          task={task}
          editableTask={editableTask}
          dispatchTaskEdit={dispatchTaskEdit}
          onSave={onSave}
          onReset={onReset}
        />
      }
      footer={[]}
    >
      <EditableTaskDescription
        task={task}
        editableTask={editableTask}
        dispatchTaskEdit={dispatchTaskEdit}
        onSave={onSave}
        onReset={onReset}
      />
    </Modal>
  );
};

export default TaskViewPopup;


