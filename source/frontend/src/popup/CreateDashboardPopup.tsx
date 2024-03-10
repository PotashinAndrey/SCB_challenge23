import type { FC } from 'react';
import { useUnit } from 'effector-react';
import { Modal, Button, Typography } from 'antd';
import { createDashboardPopup } from '../context/model/dashboard';
import { InputField } from '../form/input';

const { Paragraph } = Typography;
const hide = () => createDashboardPopup.close();

/** CreateDashboardPopup -  */
const CreateDashboardPopup: FC = () => {
  const { visible } = useUnit(createDashboardPopup);

  return (
    <Modal
      open={visible}
      width={800}
      closable
      onCancel={hide}
      title="Создание новой доски"
      // centered
      footer={[
        <Button type="primary" key="goOn" onClick={() => { }}>
          Создать
        </Button>
      ]}
    >
      {/* <InputField controller={controller({ name: "name" })} label={"Имя"} />
      <InputField controller={controller({ name: "email" })} label={"Электронная почта"} /> */}
    </Modal>
  );
};

export default CreateDashboardPopup;
