import type { FC } from "react";
import { useUnit } from "effector-react";
import { candidateProcessPopup } from "../context/model/candidate";
import { Modal, Button } from 'antd';
import CandidateInfo from "src/components/CandidateInfo";
import CandidateStatusInfo from "src/components/CandidateStatusInfo";

/** ApplicantProcessPopup -  */
const CandidateProcessPopup: FC = () => {
  const { open, close, visible, popupData } = useUnit(candidateProcessPopup);

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
      <div className="flex">
        <div className="candidateInfoBlock">
          <CandidateInfo {...popupData} />
        </div>
        <div>
          <CandidateStatusInfo
            name={popupData.name}
            status={"test status"}
            department="Разработка"
            // histories={history} 
            />
        </div>
      </div>
    </Modal>
  );
};

export default CandidateProcessPopup;
