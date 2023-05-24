import React, { useState } from "react";
import { Tag } from 'antd';

import "./ColumnItem.css";
import CandidateModal from "../CandidateModal/CandidateModal";

interface ColumnItemProps {
    title: string;
    tagText: string;
    id: string;
}

const ColumnItem: React.FC<ColumnItemProps> = props => {
    const { title, tagText, id } = props;
    const [isModalOpen, setModalOpen] = useState(false);

    const handleDragStart = (ev: any) => {
        ev.dataTransfer.setData("itemId", id);
    }

    const handleClik = () => {
        setModalOpen(false);
    }

    return (
        <>
            <div
                onClick={() => setModalOpen(true)}
                draggable
                onDragStart={handleDragStart}
                className="column-item-component boxAndRadius"
            >
                <p className="column-item-header">{title}</p>
                <Tag color="yellow">{tagText}</Tag>
            </div>
            <CandidateModal isModalOpen={isModalOpen} handleClose={handleClik} />
        </>
    );
}

export default ColumnItem;