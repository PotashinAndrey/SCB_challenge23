import { FC, useMemo } from 'react';
import { useStore } from 'effector-react';
import { Modal, Input, Select, Form, Button, Typography } from 'antd';
import { createTask, modalToggler } from '../src/context/model/tasks';
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'antd/es/form/Form';
import { $currentDashboardId } from '../src/context/model/dashboard';
import { TaskModel } from '@app/types/model/task';
import { dashboardData, processesListData } from '../context/model/process';

const { Text } = Typography;

type TaskCreateFormValues = Pick<TaskModel, 'title' | 'description' | 'process'>;

const TaskCreate: FC = () => {
  const [form] = useForm();
  const dashboardId = useStore($currentDashboardId);
  const dashboard = useStore(dashboardData.$store);
  const { close } = modalToggler;
  const isOpen = useStore(modalToggler.$isOpen);

  const processesToSelect = useMemo(() => {
    const options =
      dashboard?.processes?.map((proc: any) => ({
        value: proc.id,
        label: proc.name,
      })) ?? [];
    return [{ label: 'Выберите процесс', value: '', disabled: true }, ...options];
  }, [dashboard]);

  const onTaskCreate = (values: TaskCreateFormValues) => {
    createTask({
      ...values,
      dashboard: dashboardId,
    });
  };
  return (
    <Modal
      destroyOnClose
      open={isOpen}
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
          <Select options={processesToSelect} placeholder="Выберите процесс"></Select>
        </Form.Item>
        <Button htmlType="submit" key="submit" form="TaskCreateForm" type="primary">
          Создать
        </Button>
      </Form>
    </Modal>
  );
};

export default TaskCreate;
