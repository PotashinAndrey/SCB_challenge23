import type { FC } from "react";
import { Avatar, List } from 'antd';
import Paper from "src/ui/Paper";


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
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={`Отдел: ${item.department}, опыт работы: ${item.experience}`}
                    />
                </List.Item>
                )}
            />
        </Paper>
  );
}

export default Vacancies;
