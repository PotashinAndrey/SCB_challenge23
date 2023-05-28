import type { FC } from "react";
import { useUnit } from "effector-react";
import { Modal, Button, Select } from 'antd';
import { $interviewPopupDate, applicantData, applicantListData, createInterview, interviewPopup } from "../context/model/applicant";
import { create } from "ts-node";


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

  const handleArrangeInterviewClick = () => {
      console.log(interviewPopupDate)
      if (interviewPopupDate) {
          createInterview({
            task: '62c6a8b5-84b5-485b-9a33-516422a74ef8',
            // employee: UUID;
            // status: UUID;
            // author: UUID;
            type: '37f1a346-7745-4e00-9ebf-38ce293d59b9',
            name: 'Собеседование с HR',
            timestamp: +interviewPopupDate,
            description: 'будет происходить online в Zoom'
          })
          close;
      }
  }

  
  return (
    <Modal
      open={visible}
      width={600}
      closable={true}
      onCancel={() => interviewPopup.close()}
      footer={[
        <Button type="primary" key="goOn" onClick={() => handleArrangeInterviewClick()}>
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
