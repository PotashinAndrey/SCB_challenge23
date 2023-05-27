import type { FC } from "react";
import { useEffect } from "react";
import { Avatar, Button, List, Descriptions } from 'antd';
import { useUnit } from "effector-react";
import type { VacancyModel } from "@app/types/model/vacancy";
import PageList from "../ui/PageList";
import { vacanciesListData, vacanciesPageOpen, vacancyCreatePopup } from "../context/model/vacancy";

const Vacancies: FC = () => {
  const { store, loading } = useUnit(vacanciesListData);

  useEffect(vacanciesPageOpen, []);

  return (
    <PageList
      caption="Наши вакансии"
      description="Эти вакансии также размещаются на всех популярных площадках"
      loading={loading}
      dataSource={(store?.items || []) as Array<VacancyModel>}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} size={60} />}
            title={item.name}
            description={(
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Отдел / Команда">{item.department.name}</Descriptions.Item>
                <Descriptions.Item label="Описание">{item.description}</Descriptions.Item>
              </Descriptions>
            )}
          />
        </List.Item>
      )}
    >
      <Button type="primary" onClick={() => vacancyCreatePopup.open()}>Добавить вакансию</Button>
    </PageList>
  );
}

export default Vacancies;
