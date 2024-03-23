import { type FC, useState, useReducer, useEffect, useCallback } from 'react';
import { useStore, useUnit } from 'effector-react';
import { Button, Modal, Layout } from 'antd';
import { $currentTask, taskViewPopup, updateTask } from '@context/model/tasks';
import type { TaskModel } from '@app/types/model/task';
import { EditableTaskTitle } from './EditableTaskTitle';
import { EditableTaskDescription } from './EditableTaskDescription';
import { TaskActions } from './TaskActions';

const reducer = (state: TaskModel, payload: Partial<TaskModel>): TaskModel => {
  return { ...state, ...payload };
};

const { Header, Footer, Sider, Content } = Layout;

const TaskViewPopup: FC = () => {
  const task = useStore($currentTask);
  const { visible, close } = useUnit(taskViewPopup);
  const [editableTask, dispatchTaskEdit] = useReducer(reducer, { ...task });

  useEffect(() => {
    dispatchTaskEdit({ ...task });
  }, [task]);

  const onReset = useCallback(() => {
    dispatchTaskEdit({ ...task });
  }, [task, dispatchTaskEdit]);

  const onSave = useCallback(() => {
    updateTask(editableTask);
  }, [editableTask]);

  const saveAndClose = () => {
    onSave();
    close();
  };

  return (
    <Modal
      destroyOnClose
      open={visible}
      width={900}
      closable
      onCancel={() => close()}
      title={<EditableTaskTitle task={task} editableTask={editableTask} dispatchTaskEdit={dispatchTaskEdit} onSave={onSave} onReset={onReset} />}
      footer={[
        <Button key="close" type="text" onClick={close}>
          Закрыть
        </Button>,
        <Button key="save" type="primary" onClick={saveAndClose}>
          Сохранить
        </Button>
      ]}
    >
      <Layout>
        <Content>
          <EditableTaskDescription task={task} editableTask={editableTask} dispatchTaskEdit={dispatchTaskEdit} onSave={onSave} onReset={onReset} />
        </Content>
        <Sider width="30%">
          <TaskActions task={task} editableTask={editableTask} dispatchTaskEdit={dispatchTaskEdit} />
        </Sider>
      </Layout>
    </Modal>
  );
};

export default TaskViewPopup;
