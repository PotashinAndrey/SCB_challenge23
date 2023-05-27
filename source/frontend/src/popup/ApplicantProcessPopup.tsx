import type { FC } from "react";
import { useUnit } from "effector-react";
import { Modal, Button } from 'antd';
import { candidateProcessPopup } from "../context/model/candidate";
import CandidateStatusInfo from '../components/CandidateStatusInfo';
import CandidateInfo from "../components/CandidateInfo";

/** ApplicantProcessPopup -  */
const ApplicantProcessPopup: FC = () => {
  const { open, close, visible } = useUnit(candidateProcessPopup);

  return (
    <Modal
        open={visible}
        width={900}
        onCancel={() => candidateProcessPopup.close()}
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
      <div className="candidate-modal">
        <div className="candidateInfoBlock">
            {/* <CandidateInfo /> */}
            123
        </div>
        {/* <div>
            <CandidateStatusInfo />
        </div> */}
      </div>
    </Modal>
  );
};

export default ApplicantProcessPopup;
