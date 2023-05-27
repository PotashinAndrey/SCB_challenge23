import type { FC } from "react";
import { useUnit } from "effector-react";
import { candidateProcessPopup } from "../context/model/candidate";
import { Modal, Button } from 'antd';
import CandidateInfo from "src/components/CandidateInfo";
import CandidateStatusInfo from "src/components/CandidateStatusInfo";

/** ApplicantProcessPopup -  */
const InterviewPopup: FC = () => {
  const { open, close, visible } = useUnit(candidateProcessPopup);


  return (
    <Modal
      open={visible}
      width={800}
      closable={true}
      onCancel={() => candidateProcessPopup.close()}
      footer={[
        <Button type="primary" key="goOn" onClick={() => { }}>
          Взять на рассмотрение
        </Button>,
        <Button danger key="reject" onClick={() => candidateProcessPopup.close()}>
          Отказать
        </Button>,

      ]}
    >
    </Modal>
  );
};

export default InterviewPopup;
