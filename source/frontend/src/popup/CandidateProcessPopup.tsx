import type { FC } from "react";
import { useUnit } from "effector-react";
import { candidateProcessPopup, applicantData } from "../context/model/applicant";
import { Modal, Button } from 'antd';
import CandidateInfo from "../components/CandidateInfo";
import CandidateStatusInfo from "../components/CandidateStatusInfo";

/** ApplicantProcessPopup -  */
const CandidateProcessPopup: FC = () => {
  const { open, close, visible } = useUnit(candidateProcessPopup);
  const { store: candidate } = useUnit(applicantData);

  // console.log(popupData)

  return (
    <Modal
      open={visible}
      width={928}
      closable={true}
      onCancel={close}
      footer={[
        <Button type="link" key="reject" onClick={close}>
          Закрыть
        </Button>,
        <Button type="primary" key="goOn" onClick={() => { }}>
          Продолжить назначение
        </Button>
      ]}
    >
      <div className="flex gap margin padding">
        <CandidateInfo candidate={candidate} className="w-modal" />
        <CandidateStatusInfo
          className="w-aside"
          name={candidate.name}
          status={"test status"}
          department="Разработка" // todo
          // histories={history}
        />
      </div>
    </Modal>
  );
};

export default CandidateProcessPopup;
