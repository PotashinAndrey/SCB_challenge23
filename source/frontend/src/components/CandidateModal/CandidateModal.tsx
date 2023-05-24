import "./CandidateModal.css";
import React from "react";
import { Modal } from 'antd';
import CandidateStatusInfo from '../CandidateStatusInfo/CandidateStatusInfo';

interface CandidateModalProps {
    isModalOpen: boolean;
    handleOk?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    handleClose: () => void;
}

const CandidateModal: React.FC<CandidateModalProps> = props => {
    const { isModalOpen, handleOk, handleClose } = props;

    console.log(isModalOpen)

    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleClose}>
            <div className="candidate-modal">
                <div>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </div>
                <div>
                    <CandidateStatusInfo />
                </div>
            </div>
        </Modal>
    );
}

export default CandidateModal;
