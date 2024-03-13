import type { FC } from 'react';
import type { TaskModel } from '@app/types/model/task';
import { useStore, useUnit } from 'effector-react';
import { Modal, Input, Select, Form, Button, Typography } from 'antd';
import { createTask, createTaskPopup } from '../context/model/tasks';
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'antd/es/form/Form';
import { $currentDashboardId } from '../context/model/dashboard';
import { dashboardData } from '../context/model/process';

const { Text } = Typography;

type TaskCreateFormValues = Pick<TaskModel, 'title' | 'description' | 'process'>;

const TaskCreatePopup: FC = () => {
  const [form] = useForm();
  const dashboardId = useStore($currentDashboardId);
  const dashboard = useStore(dashboardData.$store);
  const { visible, close } = useUnit(createTaskPopup);

  const getProcessesToSelect = () => {
    const baseOptions =
      dashboard?.processes?.map((proc: any) => ({
        value: proc.id,
        label: proc.name,
      })) ?? [];
    return [{ label: 'Выберите процесс', value: '', disabled: true }, ...baseOptions];
  };

  const onTaskCreate = (values: TaskCreateFormValues) => {
    createTask({
      ...values,
      dashboard: dashboardId,
    });
  };
  return (
    <Modal
      destroyOnClose
      open={visible}
      width={800}
      closable
      onCancel={() => close()}
      title="Создание новой задачи"
      footer={[]}
    >
      <Form form={form} onFinish={onTaskCreate} name="TaskCreateForm">
        <Text>Название</Text>
        <Form.Item name="title">
          <Input></Input>
        </Form.Item>
        <Text>Описание</Text>
        <Form.Item name="description">
          <TextArea></TextArea>
        </Form.Item>
        <Text>Процесс</Text>
        <Form.Item name="process">
          <Select
            options={getProcessesToSelect()}
            placeholder="Выберите процесс"
          ></Select>
        </Form.Item>
        <Button htmlType="submit" key="submit" form="TaskCreateForm" type="primary">
          Создать
        </Button>
      </Form>
    </Modal>
  );
};

export default TaskCreatePopup;
