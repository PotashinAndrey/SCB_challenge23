import type { FC } from "react";
import { useEffect } from "react";
import { Avatar, List } from 'antd';
import { useUnit } from "effector-react";

import type { DepartmentModel } from "@app/types/model/department";
import { departamentListData, departamentPageOpen } from "../context/model/department";

import Paper from "../ui/Paper";

const Departments: FC = () => {
  const { store, loading } = useUnit(departamentListData);

  useEffect(departamentPageOpen, []);

  return (
    <Paper className="primary w-main margin-center mt-content mb-content bordered">
      <List
        itemLayout="horizontal"
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
    </Paper>
  );
}

export default Departments;
