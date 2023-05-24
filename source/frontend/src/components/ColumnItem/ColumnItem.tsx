import React from "react";
import { Tag } from 'antd';

import "./ColumnItem.css";

interface ColumnItemProps {
    title: string;
    tagText: string;
    id: string;
}

const ColumnItem: React.FC<ColumnItemProps> = props => {
    const { title, tagText, id} = props;

    const handleDragStart = (ev: any) => {
        ev.dataTransfer.setData("itemId", id);
    }

    return (
        <div draggable onDragStart={handleDragStart} className="column-item-component boxAndRadius">
            <p className="column-item-header">{title}</p>
            <Tag color="yellow">{tagText}</Tag>
        </div>
    );
}

export default ColumnItem;