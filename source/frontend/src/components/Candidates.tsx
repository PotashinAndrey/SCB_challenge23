import type { FC } from "react";
import { Avatar, List } from 'antd';
import Paper from "src/ui/Paper";
import { applicantProcessPopup } from "src/context/model/applicant";
import { candidateProcessPopup } from "src/context/model/candidate";


const items = [
    {
      title: 'Анна Матвеева',
      department: 'Розница',
      experience: '1-3 года'
    },
    {
      title: 'Максим Иванов',
      department: 'Розница',
      experience: '3-5 лет'
    }
];

const Candidates: FC = () => {
  return (
        <Paper>
            <List
                itemLayout="horizontal"
                dataSource={items}
                renderItem={(item, index) => (
                <List.Item onClick={() => candidateProcessPopup.open()}>
                    <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    description={
                        <>
                            {item.title} 
                            <br/>
                            Отдел: {item.department}
                            <br/>
                            Опыт работы: {item.experience}
                        </>}
                    />
                </List.Item>
                )}
            />
        </Paper>
  );
}

export default Candidates;
