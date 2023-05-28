import type { FC } from "react";
import { Typography, Divider, Descriptions, Avatar } from 'antd';
import { PropsWithClassName } from "@app/types/ui";
import Amount from "../ui/Amount";
import Caption from "../ui/Caption";

const { Text } = Typography;

type CandidateInfoProps = PropsWithClassName & {
  candidate: any;
}

const CandidateInfo: FC<CandidateInfoProps> = props => {
  const { candidate, className } = props;
  const contactsData = candidate.email || candidate.phone || candidate.vk || candidate.telegram;
  const notesAndDescription = candidate.notes || candidate.description;

  return (
    <div className={className}>
      <div className="flex margin padding mb-8">
        <Avatar size={72} src={"https://xsgames.co/randomusers/avatar.php?g=pixel&key=1&" + Math.random()} />
        <div className="ml-8">
          <Caption>{candidate.name}</Caption>
          <Text>{candidate.position}</Text>
        </div>
      </div>

      <Caption level={4}>Профессиональные навыки</Caption>
      <Descriptions column={1} size="small">
        <Descriptions.Item label="Желаемая позиция">{candidate.position}</Descriptions.Item>
        <Descriptions.Item label="Желаемая зарплата"><Amount value={candidate.salary} /></Descriptions.Item>
        <Descriptions.Item label="Опыт работы">{candidate.experience}</Descriptions.Item>
      </Descriptions>

      <Divider />

      <Caption level={4}>Общая информация</Caption>
      <Descriptions column={1} size="small">
        <Descriptions.Item label="Пол">{candidate.sex === "male" ? "Мужской" : "Женский"}</Descriptions.Item>
        <Descriptions.Item label="Дата рождения">{new Date(candidate.birthdate).toLocaleDateString()}</Descriptions.Item>
      </Descriptions>

      {Boolean(contactsData) && (
        <>
          <Divider />
          <Caption level={4}>Контактные данные кандидата</Caption>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Почта">{candidate.email}</Descriptions.Item>
            <Descriptions.Item label="Телефон">{candidate.phone}</Descriptions.Item>
            <Descriptions.Item label="Телеграм">{candidate.telegram}</Descriptions.Item>
            <Descriptions.Item label="ВКонтакте">{candidate.vk}</Descriptions.Item>
          </Descriptions>
        </>
      )}

      {Boolean(candidate.link) && (
        <>
          <Divider />
          <Caption level={4}>Стороние резюме</Caption>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="HeadHunter"><a href={candidate.link}>{candidate.link}</a></Descriptions.Item>
          </Descriptions>
        </>
      )}

      {Boolean(notesAndDescription) && (
        <>
          <Divider />
          <Caption level={4}>Описание и заметки</Caption>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Заметки">{candidate.notes}</Descriptions.Item>
            <Descriptions.Item label="Описание">{candidate.description}</Descriptions.Item>
          </Descriptions>
        </>
      )}
    </div>
  );
}

export default CandidateInfo;
