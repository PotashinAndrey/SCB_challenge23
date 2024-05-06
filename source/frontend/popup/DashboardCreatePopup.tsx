import type { FC } from 'react';
import { useUnit } from 'effector-react';
import { Modal, Button } from 'antd';
import { useForm } from '@effector-reform/react';
import { dashboardCreatePopup, $$dashboardCreateForm } from '@context/model/dashboard';
import DashboardCreate from '@page/dashboard/DashboardCreate';

/** Попап обертка вокруг формы создания доски-дашборда */
const DashboardCreatePopup: FC = () => {
  const { visible, close } = useUnit(dashboardCreatePopup);
  const { onSubmit } = useForm($$dashboardCreateForm);

  return (
    <Modal
      open={visible}
      width={800}
      closable
      onCancel={close}
      title="Создание новой доски"
      // centered
      footer={[
        <Button key="close" type="text" onClick={() => {
          $$dashboardCreateForm.reset();
          close();
        }}>Отмена</Button>,
        <Button type="primary" key="create" onClick={() => onSubmit()}>Создать</Button>
      ]}
    >
      <DashboardCreate />
    </Modal>
  );
};

export default DashboardCreatePopup;
