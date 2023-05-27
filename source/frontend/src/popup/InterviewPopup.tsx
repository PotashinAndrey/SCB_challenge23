import type { FC } from "react";
import { useUnit } from "effector-react";
import { Modal, Button, Select } from 'antd';
import { $interviewPopupDate, applicantData, applicantListData, interviewPopup } from "../context/model/applicant";


/** ApplicantProcessPopup -  */
const InterviewPopup: FC = () => {
  const { open, close, visible } = useUnit(interviewPopup);
  const { store } = useUnit(applicantListData);
  const interviewPopupDate = useUnit($interviewPopupDate);

  const candidatesOptions = store.items.map((item) => {
      return {
          label: item.name,
          value: item.id
      }
  });

  return (
    <Modal
      open={visible}
      width={600}
      closable={true}
      onCancel={() => interviewPopup.close()}
      footer={[
        <Button type="primary" key="goOn" onClick={() => { }}>
          Назначить интервью
        </Button>,
        <Button type="primary" key="goOn" onClick={() => { }}>
          Отменить интервью
        </Button>
      ]}
    >
        <Select
          defaultValue="Выбор кандидата"
          style={{ width: 230 }}
          onChange={() => { }}
          options={candidatesOptions}
        />
    </Modal>
  );
};

export default InterviewPopup;
