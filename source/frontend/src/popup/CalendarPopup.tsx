import type { FC } from "react";
import { useUnit } from "effector-react";
import { Modal, Button, Select } from 'antd';
import { $interviewPopupDate, applicantData, applicantListData, calendarPopup } from "../context/model/applicant";
import CalendarItem from "src/components/CalendarComponent";


const CalendarPopup: FC = () => {
  const { open, close, visible } = useUnit(calendarPopup);
  const { store } = useUnit(applicantListData);
  const interviewPopupDate = useUnit($interviewPopupDate);


  return (
    <Modal
      open={visible}
      width={950}
      closable={true}
      onCancel={() => calendarPopup.close()}
      footer={[
        <Button type="primary" key="goOn" onClick={() => { }}>
          Назначить интервью
        </Button>,
        <Button type="primary" key="goOn" onClick={() => { }}>
          Отмена
        </Button>
      ]}
    >
       <CalendarItem/>
    </Modal>
  );
};

export default CalendarPopup;
