import React from "react";
import { Modal } from 'antd';

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
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
}

export default CandidateModal;
