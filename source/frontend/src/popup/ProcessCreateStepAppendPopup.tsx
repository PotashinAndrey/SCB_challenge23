import type { FC } from "react";
import { useUnit } from "effector-react";
import { Modal, Button, Typography } from 'antd';
import { processCreateStepAppendPopup } from "../context/model/process";
import { InputField } from "../form/input";

const { Paragraph } = Typography;
const hide = () => processCreateStepAppendPopup.close();

/** ProcessCreateStepAppendPopup -  */
const ProcessCreateStepAppendPopup: FC = () => {
  const { open, close, visible } = useUnit(processCreateStepAppendPopup);

  return (
    <Modal
      open={visible}
      width={800}
      closable
      onCancel={hide}
      title="Параметры шага процесса найма"
      footer={[]}
      // centered
      // footer={[
      //   <Button type="primary" key="goOn" onClick={() => { }}>
      //     Взять на рассмотрение
      //   </Button>,
      //   <Button type="link" key="reject" onClick={hide}>Отмена</Button>
      // ]}
    >
      <Paragraph className="mb-8">Укажите название шага процесса, а также выберите действие, отвечающее за него</Paragraph>

                      {/* <InputField controller={controller({ name: "name" })} label={"Имя"} />
                <InputField controller={controller({ name: "email" })} label={"Электронная почта"} /> */}
    </Modal>
  );
};

export default ProcessCreateStepAppendPopup;
