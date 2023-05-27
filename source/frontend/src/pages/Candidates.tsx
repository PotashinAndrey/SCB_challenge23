import type { FC } from "react";
import { useEffect } from "react";
import { Avatar, List, Button, Descriptions } from 'antd';
import { useUnit } from "effector-react";
import type { CandidateModel } from "@app/types/model/candidate";
import PageList from "../ui/PageList";
import { applicantProcessPopup, applicantData, applicantesPageOpen, applicantListData } from "../context/model/applicant";
import { routing } from "../context/router";

const Candidates: FC = () => {
  const { store, loading } = useUnit(applicantListData);

  useEffect(applicantesPageOpen, []);

  const handeItemClick = (item: CandidateModel) => {
    applicantProcessPopup.setPopupData(item)
    applicantProcessPopup.open();
  }

  return (
    <PageList
      caption="Отзывы на вакансии"
      description="Список потенциальных кандидатов для найма"
      loading={loading}
      dataSource={(store?.items || []) as Array<CandidateModel>}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} size={60} />}
            title={item.name}
            description={(
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Желаемая должность">{item.position}</Descriptions.Item>
                <Descriptions.Item label="Опыт работы">{item.experience}</Descriptions.Item>
              </Descriptions>
            )}
          />
        </List.Item>
      )}
    >
      <Button type="primary" onClick={() => routing.candidateCreate.open()}>Добавить кандидата</Button>
    </PageList>
  );
}

export default Candidates;
