import "./CandidateModal.css";
import React from "react";
import { Modal } from 'antd';
import CandidateStatusInfo from '../CandidateStatusInfo/CandidateStatusInfo';
import { CandidateInfo } from "../CandidateInfo";

interface CandidateModalProps {
    isModalOpen: boolean;
    handleOk?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    handleClose: () => void;
}

const candidate = {//todo
    name: "Андрей Поташин",
    role: "middle frontend developer",
    description: {
        birthDate: "29.04.2000",
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
    date: "03.05.0033",
    message: "Умер"
}]

const CandidateModal: React.FC<CandidateModalProps> = props => {
    const { isModalOpen, handleOk, handleClose } = props;

    console.log(isModalOpen)

    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleClose} width={900}>
            <div className="candidate-modal">
                <div className="candidateInfoBlock">
                    <CandidateInfo {...candidate} />
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
