import { FC, useEffect } from "react";
import { Avatar, Button, List } from 'antd';
import Paper from "src/ui/Paper";
import { useUnit } from "effector-react";
import { vacanciesListData, vacanciesPageOpen } from "../context/model/vacancy";

import type { VacancyModel } from "@app/types/model/vacancy";
import { vacancyCreatePopup } from "../context/model/vacancy";
import { departamentListData } from "src/context/model/department";
import { UUID } from "crypto";
import { DepartmentModel } from "@app/types/model/department";


const Vacancies: FC = () => {
  const { store, loading } = useUnit(vacanciesListData);
  const { store: departmentsStore, } = useUnit(departamentListData);

  useEffect(vacanciesPageOpen, []);

  const findDepartmentName = (departmentId: string | UUID) => {
    return (departmentsStore?.items as DepartmentModel[] || []).find(e => e.id === departmentId)?.name;
  }

  const handleCreate = () => {
    vacancyCreatePopup.open()
  }

  return (
        <Paper>
            <Button type="primary" onClick={handleCreate}>Добавить вакансию</Button>
            <List
                style={{width: '870px'}}
                itemLayout="horizontal"
                dataSource={(store?.items || []) as VacancyModel[]}
                renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    title={item.name}
                    description={`Отдел: ${item.department.name}, опыт работы: ${item.description}`}
                    />
                </List.Item>
                )}
            />
        </Paper>
  );
}

export default Vacancies;
