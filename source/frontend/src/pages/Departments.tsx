import type { FC } from "react";
import { useEffect } from "react";
import { Avatar, List } from 'antd';
import { useUnit } from "effector-react";
import PageList from "../ui/PageList";

import type { DepartmentModel } from "@app/types/model/department";
import { departamentListData, departamentPageOpen } from "../context/model/department";

const Departments: FC = () => {
  const { store, loading } = useUnit(departamentListData);

  useEffect(departamentPageOpen, []);

  return (
    <PageList
      caption="Интервьюеры"
      description="Руководители отделов и сотрудники, которые проводят собеседования"
      loading={loading}
      dataSource={(store?.items || []) as DepartmentModel[]}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
            title={item.name}
          />
        </List.Item>
      )}
    />
  );
}

export default Departments;
