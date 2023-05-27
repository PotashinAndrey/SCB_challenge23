import { FC, useEffect } from "react";
import { Avatar, List } from 'antd';
import { useUnit } from "effector-react";

import type { DepartmentModel } from "@app/types/model/department";

import Paper from "src/ui/Paper";
import { departamentListData, departamentPageOpen } from "src/context/model/department";


const Department: FC = () => {
  const { store, loading } = useUnit(departamentListData);

  useEffect(departamentPageOpen, []);
  

  return (
        <Paper>
            <List
                style={{width: '870px'}}
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

export default Department;
