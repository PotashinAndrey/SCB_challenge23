import type { FC } from "react";
import { useUnit } from "effector-react";
import { candidateProcessPopup } from "../context/model/candidate";
import { Modal, Button } from 'antd';
import CandidateInfo from "../components/CandidateInfo";
import CandidateStatusInfo from "../components/CandidateStatusInfo";

/** ApplicantProcessPopup -  */
const CandidateProcessPopup: FC = () => {
  const { open, close, visible, popupData } = useUnit(candidateProcessPopup);

  console.log(popupData)

  return (
    <Modal
      open={visible}
      width={800}
      closable={true}
      onCancel={() => candidateProcessPopup.close()}
      footer={[
        <Button type="primary" key="goOn" onClick={() => { }}>
          Продолжить назначение
        </Button>,
        <Button danger key="reject" onClick={() => candidateProcessPopup.close()}>
          Отказать
        </Button>,

      ]}
    >
      <div className="candidateInfoPopup">
        <div className="candidateInfoBlock">
          <CandidateInfo {...popupData} />
        </div>
        <div>
          <CandidateStatusInfo
            name={popupData.name}
            status={"test status"}
            department="Разработка"//todo
            // histories={history}
            />
        </div>
      </div>
    </Modal>
  );
};

export default CandidateProcessPopup;
