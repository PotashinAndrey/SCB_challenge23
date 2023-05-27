import type { FC } from "react";
import { useUnit } from "effector-react";
import { Modal, Button, Typography, Divider } from 'antd';
import { applicantProcessPopup as candidateProcessPopup, applicantData } from "../context/model/applicant";
import CandidateStatusInfo from '../components/CandidateStatusInfo';
import CandidateInfo from "../components/CandidateInfo";

const { Title, Text } = Typography;

/** ApplicantProcessPopup -  */
const ApplicantProcessPopup: FC = () => {
  const { open, close, visible, popupData } = useUnit(candidateProcessPopup);
  const { store, loading } = useUnit(applicantData);

  const contactsData = popupData.email || popupData.phone || popupData.vk || popupData.telegram;
  const notesAndDescription = popupData.notes || popupData.description;

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
        <Title level={2}>{popupData.name}</Title>

        <Divider />

        <Title level={3}>Профессиональные навыки</Title>
        <InfoString text="Позиция: " value={popupData.position} />
        <InfoString text="Зарплата: " value={popupData.salary} />
        <InfoString text="Опыт: " value={popupData.experience} />

        <Divider />

        <Title level={3}>Общая информация</Title>
        <InfoString text="Пол: " value={popupData.sex === "male" ? "Мужчина" : "Женщина"} />
        <InfoString text="Дата роджения: " value={new Date(popupData.birthdate).toDateString()} />

        <Divider />

        {contactsData && <Title level={3}>Контактые кандидата</Title>}
        <InfoString text="Почта: " value={popupData.email} />
        <InfoString text="Телефон: " value={popupData.phone} />
        <InfoString text="Телеграм: " value={popupData.telegram} />
        <InfoString text="ВКонтакте: " value={popupData.vk} />

        {popupData.link && <Divider />}

        {popupData.link &&<Title level={3}>Стороние резюме</Title>}
        {popupData.link && <p><Text>Ссылка на стороннее резюме: <a href={popupData.link}>{popupData.link}</a></Text></p>}

        {popupData.link && <Divider />}

        {contactsData && <Title level={3}>Описание и заметки</Title>}
        <InfoString text="Заметки: " value={popupData.notes} />
        <InfoString text="Описание: " value={popupData.description} />
      </div>
    </Modal>
  );
};

const InfoString: FC<{text?: string, value?: string}> = ({text, value}) => {
  if (!value) return null;

  return (<p><Text>{`${text}${value}`}</Text></p>);
}

export default ApplicantProcessPopup;
