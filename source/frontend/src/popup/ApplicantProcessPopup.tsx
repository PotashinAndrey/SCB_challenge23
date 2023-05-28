import type { FC } from "react";
import type { UUID } from "node:crypto";
import { useUnit } from "effector-react";
import { Modal, Button, Typography, Divider, Descriptions, Avatar, Space } from 'antd';
import Caption from "../ui/Caption";
import Amount from "../ui/Amount";
import { applicantProcessPopup as candidateProcessPopup, applicantData, candidateApply } from "../context/model/applicant";
import CandidateStatusInfo from '../components/CandidateStatusInfo';
import CandidateInfo from "../components/CandidateInfo";

const { Title, Text, Paragraph } = Typography;

/** ApplicantProcessPopup -  */
const ApplicantProcessPopup: FC = () => {
  const { open, close, visible, popupData } = useUnit(candidateProcessPopup);
  const { store, loading } = useUnit(applicantData);

  const contactsData = popupData.email || popupData.phone || popupData.vk || popupData.telegram;
  const notesAndDescription = popupData.notes || popupData.description;

  const handleCandidateApply = (id: UUID) => {
    candidateApply(id);
    close();
  }

  return (
    <Modal
      open={visible}
      width={700}
      // title="Соискатель"
      onCancel={() => candidateProcessPopup.close()}
      footer={(
        <div className="flex space-between mt-8">
          <Button type="link" danger key="reject" onClick={() => { }}>
            Отказать
          </Button>
          <div>
            <Button key="back" type="link" onClick={close}>
              Закрыть
            </Button>
            <Button type="primary" key="goOn" onClick={() => handleCandidateApply(popupData.id)}>
              Взять на рассмотрение
            </Button>
          </div>
        </div>
      )}
    >
      <div className="candidate-modal">
        {/* <Title level={2}>{}</Caption>

        <Divider /> */}

        <div className="flex margin padding mb-8">
          <Avatar size={72} src={"https://xsgames.co/randomusers/avatar.php?g=pixel&key=1&" + Math.random()} />
          <div className="ml-8">
            <Caption>{popupData.name}</Caption>
            <Text>{popupData.position}</Text>
          </div>
        </div>

        <Caption level={4}>Профессиональные навыки</Caption>
        <Descriptions column={1} size="small">
          <Descriptions.Item label="Желаемая позиция">{popupData.position}</Descriptions.Item>
          <Descriptions.Item label="Желаемая зарплата"><Amount value={popupData.salary} /></Descriptions.Item>
          <Descriptions.Item label="Опыт работы">{popupData.experience}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Caption level={4}>Общая информация</Caption>
        <Descriptions column={1} size="small">
          <Descriptions.Item label="Пол">{popupData.sex === "male" ? "Мужчина" : "Женщина"}</Descriptions.Item>
          <Descriptions.Item label="Дата рождения">{new Date(popupData.birthdate).toLocaleDateString()}</Descriptions.Item>
        </Descriptions>

        {Boolean(contactsData) && (
          <>
            <Divider />
            <Caption level={4}>Контактные данные кандидата</Caption>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Почта">{popupData.email}</Descriptions.Item>
              <Descriptions.Item label="Телефон">{popupData.phone}</Descriptions.Item>
              <Descriptions.Item label="Телеграм">{popupData.telegram}</Descriptions.Item>
              <Descriptions.Item label="ВКонтакте">{popupData.vk}</Descriptions.Item>
            </Descriptions>
          </>
        )}

        {Boolean(popupData.link) && (
          <>
            <Divider />
            <Caption level={4}>Стороние резюме</Caption>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="HeadHunter"><a href={popupData.link}>{popupData.link}</a></Descriptions.Item>
            </Descriptions>
          </>
        )}

        {Boolean(notesAndDescription) && (
          <>
            <Divider />
            <Caption level={4}>Описание и заметки</Caption>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Заметки">{popupData.notes}</Descriptions.Item>
              <Descriptions.Item label="Описание">{popupData.description}</Descriptions.Item>
            </Descriptions>
          </>
        )}

      </div>
    </Modal>
  );
};

const InfoString: FC<{ text?: string, value?: string }> = ({ text, value }) => {
  if (!value) return null;

  return (<p><Text>{`${text}${value}`}</Text></p>);
}

export default ApplicantProcessPopup;
