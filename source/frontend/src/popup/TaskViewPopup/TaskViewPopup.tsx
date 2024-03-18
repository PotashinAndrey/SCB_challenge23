import { FC, useState, useReducer, useEffect, ChangeEvent, useCallback } from 'react';
import { useStore, useUnit } from 'effector-react';
import { Button, Modal } from 'antd';
import { $currentTask, taskViewPopup, updateTask } from '../../context/model/tasks';
import { TaskModel } from '@app/types/model/task';
import { EditableTaskTitle } from './EditableTaskTitle';
import { EditableTaskDescription } from './EditableTaskDescription';
import { TaskActions } from './TaskActions';

import "./TaskViewPopup.css";

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

  const saveAndClose = () => {
    onSave();
    close();
  }

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
      footer={[
        <Button type="text" onClick={close}>Закрыть</Button>,
        <Button type="primary" onClick={saveAndClose}>Сохранить</Button>
      ]}
    >
      <div className="editableTaskPopupBody">
        <EditableTaskDescription
          task={task}
          editableTask={editableTask}
          dispatchTaskEdit={dispatchTaskEdit}
          onSave={onSave}
          onReset={onReset}
        />
        <TaskActions
          task={task}
          editableTask={editableTask}
          dispatchTaskEdit={dispatchTaskEdit}
        />
      </div>
    </Modal>
  );
};

export default TaskViewPopup;


