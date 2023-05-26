import type { FC } from "react";
import { Avatar, List } from 'antd';
import Paper from "src/ui/Paper";


const items= [
    {
      department: 'Розница',
    },
    {
      department: 'Разработка',
    },
    {
      department: 'Тестирование',
    },
    {
      department: 'Анализ данных',
    },
];

const Department: FC = () => {
  return (
        <Paper>
            <List
                style={{width: '870px'}}
                itemLayout="horizontal"
                dataSource={items}
                renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    title={item.department}
                    description={``}
                    />
                </List.Item>
                )}
            />
        </Paper>
  );
}

export default Department;
