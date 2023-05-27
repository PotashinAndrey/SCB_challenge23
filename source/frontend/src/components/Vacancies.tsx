import { FC, useEffect } from "react";
import { Avatar, List } from 'antd';
import Paper from "src/ui/Paper";
import { useUnit } from "effector-react";
import { vacanciesListData, vacanciesPageOpen } from "src/context/model/applicant";

import type { VacancyModel } from "@app/types/model/vacancy";
import api from "src/scripts/api";


const items = [
    {
      title: 'Front-end разработчик',
      department: 'Розница',
      experience: '1-3 года'
    },
    {
      title: 'Аналитик',
      department: 'Розница',
      experience: '3-5 лет'
    },
    {
      title: 'Тестировщик ПО',
      department: 'Розница',
      experience: 'от 1 года'
    },
    {
      title: 'Back-end разработчик',
      department: 'Розница',
      experience: '1-3 года'
    },
];

const Vacancies: FC = () => {
  const { store, loading } = useUnit(vacanciesListData);

  useEffect(vacanciesPageOpen, []);

  return (
        <Paper>
            <List
                style={{width: '870px'}}
                itemLayout="horizontal"
                dataSource={(store?.items || []) as VacancyModel[]}
                renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    title={item.department}
                    description={`Отдел: ${item.department}, опыт работы: ${item.description}`}
                    />
                </List.Item>
                )}
            />
        </Paper>
  );
}

export default Vacancies;
