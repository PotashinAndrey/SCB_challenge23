import type { FC } from 'react';
import { useUnit } from 'effector-react';
import { Modal, Button } from 'antd';
import { useForm } from 'effector-react-form';
import { createDashboardPopup } from '../context/model/dashboard';
import { InputField } from '../form/input';

import { createDashbordForm, createDashbordFormSubmit } from '../context/model/dashboard';

const hide = () => createDashboardPopup.close();

/** CreateDashboardPopup -  */
const CreateDashboardPopup: FC = () => {
  const { visible } = useUnit(createDashboardPopup);
  const { controller } = useForm({ form: createDashbordForm });

  const handleCreateDashboard = () => {
    createDashbordFormSubmit();
    hide()
  }

  return (
    <Modal
      open={visible}
      width={800}
      closable
      onCancel={hide}
      title="Создание новой доски"
      // centered
      footer={[
        <Button type="primary" key="create" onClick={handleCreateDashboard}>
          Создать
        </Button>
      ]}
    >
      <InputField controller={controller({ name: "name" })} label={"Название"} />
      <InputField controller={controller({ name: "description" })} label={"Описание"} />
    </Modal>
  );
};

export default CreateDashboardPopup;
