import type { FC } from "react";
import { Modal, Button } from 'antd';
import "../style/CandidateModal.css";
import CandidateStatusInfo from './CandidateStatusInfo';
import CandidateInfo from "./CandidateInfo";

interface CandidateModalProps {
    isModalOpen: boolean;
    handleOk?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    handleClose: () => void;
}

const candidate = {//todo
    name: "Андрей Поташин",
    role: "middle frontend developer",
    description: {
        birthdate: "29.04.2000",
        sex: "Муж.",
        text: "Работать умею - работать люблю, бизнес ставит задачу - я её делаю."
    },
    salary: 300000,
    contacts: {
        email: "test@test.test",
        phone: "+55555555555",
        telegram: "@potaqqshinAndrey",
        vk: "vk.com",
    },
    notes: "Хороший чел, позитивный, надо брать!"
}

const history = [{
    date: "07.01.0001",
    message: "Родился"
}, {
    date: "23.03.0033",
    message: "Распят"
}, {
    date: "03.04.0033",
    message: "Умер"
}]

const CandidateModal: FC<CandidateModalProps> = props => {
    const { isModalOpen, handleOk, handleClose } = props;

    return (
        <Modal
            open={isModalOpen}
            width={900}
            footer={[
                <Button type="primary" key="goOn" onClick={() => { }}>
                    Назначить собеседование
                </Button>,
                <Button danger key="reject" onClick={() => { }}>
                    Отказать
                </Button>,
                <Button key="back" onClick={handleClose}>
                    Закрыть
                </Button>,
            ]}
        >
            <div className="candidate-modal">
                <div className="candidateInfoBlock">
                    {/* <CandidateInfo {...candidate} /> */}
                </div>
                <div>
                    <CandidateStatusInfo
                        name={candidate.name}
                        status={"test status"}
                        department="Разработка"
                        histories={history} />
                </div>
            </div>
        </Modal>
    );
}

export default CandidateModal;
