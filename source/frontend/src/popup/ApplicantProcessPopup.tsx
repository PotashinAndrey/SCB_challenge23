import type { FC } from "react";
import { useUnit } from "effector-react";
import { Modal, Button, Spin } from 'antd';
import { applicantProcessPopup as candidateProcessPopup, applicantData } from "../context/model/applicant";
import CandidateStatusInfo from '../components/CandidateStatusInfo';
import CandidateInfo from "../components/CandidateInfo";

/** ApplicantProcessPopup -  */
const ApplicantProcessPopup: FC = () => {
  const { open, close, visible, popupData } = useUnit(candidateProcessPopup);
  const { store, loading } = useUnit(applicantData);

  console.log("popupData", popupData)

  return (
    <Modal
        open={visible}
        width={700}
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
            <Spin spinning={loading}>
              <pre>{JSON.stringify(store, null, 2)}</pre>
              adwawdaw
            </Spin>
        </div>
        {/* <div>
            <CandidateStatusInfo />
        </div> */}
      </div>
    </Modal>
  );
};

export default ApplicantProcessPopup;
