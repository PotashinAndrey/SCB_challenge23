import { FC, useEffect } from "react";
import { Avatar, List, Button, Descriptions } from 'antd';
import { useUnit } from "effector-react";

import type { CandidateModel } from "@app/types/model/candidate";

import Paper from "../ui/Paper";
import Caption from "../ui/Caption";
import { applicantProcessPopup } from "../context/model/applicant";
import { routing } from "../context/router";
import { applicantData, applicantesPageOpen, applicantListData } from "../context/model/applicant";

const Candidates: FC = () => {
  const { store, loading } = useUnit(applicantListData);

  useEffect(applicantesPageOpen, []);

  const handeItemClick = (item: CandidateModel) => {
    applicantProcessPopup.setPopupData(item)
    applicantProcessPopup.open();
  }

  return (
    <div className="w-main margin-center mt-content mb-content">
      <Caption className="mb-4 ta-c">Отзывы на вакансии</Caption>

      <Paper className="primary bordered">
        <Paper className="primary ta-r mb-4 bordered no-shadow">
          <Button type="primary" onClick={() => routing.candidateCreate.open()}>Добавить кандидата</Button>
        </Paper>

        <List
          size="large"
          itemLayout="horizontal"
          dataSource={(store?.items || []) as CandidateModel[]}
          renderItem={(item, index) => (
            <List.Item onClick={() => handeItemClick(item)}>
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
        />
      </Paper>
    </div>
  );
}

export default Candidates;
