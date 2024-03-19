import type { FC } from 'react';
import { useStore, useUnit } from 'effector-react';
import { Modal, Button } from 'antd';
import { useForm } from 'effector-react-form';
import { createTaskForm, createTaskFormSubmit, createTaskPopup } from '@context/model/tasks';
import { dashboardData } from '@context/model/process';
import { InputField, TextAreaField } from '@form/input';
import { SelectField } from '@form/select';


const TaskCreatePopup: FC = () => {
  const dashboard = useStore(dashboardData.$store);
  const { visible, close } = useUnit(createTaskPopup);
  const { controller } = useForm({ form: createTaskForm });

  const getProcessesToSelect = () => {
    const baseOptions =
      dashboard?.processes?.map((proc: any) => ({
        value: proc.id,
        label: proc.name,
      })) ?? [];
    return [{ label: 'Выберите процесс', value: '', disabled: true }, ...baseOptions];
  };

  return (
    <Modal
      destroyOnClose
      open={visible}
      width={800}
      closable
      onCancel={() => close()}
      title="Создание новой задачи"
      footer={[
        <Button type="primary" key="create" onClick={createTaskFormSubmit}>
          Создать
        </Button>,
      ]}
    >
      <InputField controller={controller({ name: 'name' })} label={'Название'} />
      <TextAreaField
        controller={controller({ name: 'description' })}
        label={'Описание'}
      />

      <SelectField controller={controller({ name: 'process' })} label="Процесс" options={getProcessesToSelect()} />
    </Modal>
  );
};

export default TaskCreatePopup;
