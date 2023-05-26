import type { FC } from "react";
import { useUnit } from "effector-react";
import { candidateProcessPopup } from "../context/model/candidate";
import { Modal, Button } from 'antd';

/** ApplicantProcessPopup -  */
const CandidateProcessPopup: FC = () => {
  const { open, close, visible } = useUnit(candidateProcessPopup);
  
  return (
    <Modal
    open={visible}
    width={600}
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
    Тут будет резюме
    </Modal>
  );
};

export default CandidateProcessPopup;
