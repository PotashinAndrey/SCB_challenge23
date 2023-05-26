import type { FC } from "react";
import { useUnit } from "effector-react";
import { Modal, Button } from 'antd';
import { applicantProcessPopup } from "../context/model/applicant";

/** ApplicantProcessPopup -  */
const ApplicantProcessPopup: FC = () => {
  const { open, close, visible } = useUnit(applicantProcessPopup);

  return (
    <Modal
        open={visible}
        width={900}
        footer={[
            <Button type="primary" key="goOn" onClick={() => { }}>
                Назначить собеседование
            </Button>,
            <Button danger key="reject" onClick={() => { }}>
                Отказать
            </Button>,
            <Button key="back" onClick={close}>
                Закрыть
            </Button>,
        ]}
    >
        {/* <div className="candidate-modal">
            <div className="candidateInfoBlock">
                <CandidateInfo {...candidate} />
            </div>
            <div>
                <CandidateStatusInfo
                    name={candidate.name}
                    status={"test status"}
                    department="Разработка"
                    histories={history} />
            </div>
        </div> */}
        123
    </Modal>
  );
};

export default ApplicantProcessPopup;
