import { FC, useEffect } from "react";
import { Avatar, List, Button } from 'antd';
import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";

import type { CandidateModel } from "@app/types/model/candidate";

import Paper from "../ui/Paper";
import { candidateProcessPopup } from "../context/model/candidate";
import { routing } from "../context/router";
import { applicantData, applicantesPageOpen } from "../context/model/applicant";


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
    const { store, loading } = useUnit(applicantData);

    useEffect(applicantesPageOpen, []);

    console.log(store)

  return (
        <Paper>
            <List
                itemLayout="horizontal"
                dataSource={(store?.candidates || []) as CandidateModel[]}
                renderItem={(item, index) => (
                <List.Item onClick={() => candidateProcessPopup.open()}>
                    <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    description={
                        <>
                            {item.name}
                            <br/>
                            Отдел: {item.department}
                            <br/>
                            Опыт работы: {item.experience}
                        </>}
                    />
                </List.Item>
                )}
            />
            <Link to={routing.candidateCreate}>
                <Button>Добавить кандидата</Button>
            </Link>
        </Paper>
  );
}

export default Candidates;
