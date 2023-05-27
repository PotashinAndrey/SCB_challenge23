import { FC, useEffect } from "react";
import { Avatar, List, Button } from 'antd';
import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";

import type { CandidateModel } from "@app/types/model/candidate";

import Paper from "../ui/Paper";
import { applicantProcessPopup } from "../context/model/applicant";
import { routing } from "../context/router";
import { applicantData, applicantesPageOpen, applicantListData } from "../context/model/applicant";


const Candidates: FC = () => {
  const { store, loading } = useUnit(applicantListData);

  useEffect(applicantesPageOpen, []);

  const handeItemClick = (item: CandidateModel) => {
    applicantProcessPopup.setPopupData(item)
    applicantProcessPopup.open();
  }

  return (
        <Paper>
            <List
                itemLayout="horizontal"
                dataSource={(store?.items || []) as CandidateModel[]}
                renderItem={(item, index) => (
                <List.Item onClick={() => handeItemClick(item)}>
                    <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    description={
                        <>
                            {item.name}
                            <br/>
                            {item.position}
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
