import React from "react";
import { Tag } from 'antd';

import "./ColumnItem.css";

interface ColumnItemProps {
    title: string;
    tagText: string
}

const ColumnItem: React.FC<ColumnItemProps> = props => {
    const { title, tagText} = props;

    return (
        <div className="column-item-component boxAndRadius">
            <p className="column-item-header">{title}</p>
            <Tag color="yellow">{tagText}</Tag>
        </div>
    );
}

export default ColumnItem;