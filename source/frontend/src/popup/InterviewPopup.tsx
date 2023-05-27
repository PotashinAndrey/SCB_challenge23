import type { FC } from "react";
import { useUnit } from "effector-react";
import { candidateProcessPopup } from "../context/model/candidate";
import { Modal, Button } from 'antd';
import CandidateInfo from "src/components/CandidateInfo";
import CandidateStatusInfo from "src/components/CandidateStatusInfo";

const hide = () => candidateProcessPopup.close();

/** ApplicantProcessPopup -  */
const InterviewPopup: FC = () => {
  const { open, close, visible } = useUnit(candidateProcessPopup);

  return (
    <Modal
      open={visible}
      width={800}
      closable
      onCancel={hide}
      footer={[
        <Button type="link" key="reject" onClick={hide}>Отказать</Button>,
        <Button type="primary" key="goOn" onClick={() => { }}>
          Взять на рассмотрение
        </Button>
      ]}
    >
      123
    </Modal>
  );
};

export default InterviewPopup;
