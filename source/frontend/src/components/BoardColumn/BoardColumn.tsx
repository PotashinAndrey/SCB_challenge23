import React from 'react';

import { BoardCardItemType } from "@app/types/model/board";

import { ColumnItem } from "../ColumnItem";

import "./BoardColumn.css"

interface BoardColumnProps {
    name: string;
    total: number;
    current: number;
    items: Array<BoardCardItemType>;
}

const BoardColumn: React.FC<BoardColumnProps> = props => {
    const { name, total, current, items } = props;

    return (
        <div className="column-component boxAndRadius">
            <h4 className="column-header">
                <span>{name}</span>
                <span>{`${current}/${total}`}</span>
            </h4>
            {items && <div className="column-content">
                {items.map(e => (
                    <ColumnItem title={e.title} tagText={e.step} />
                ))}
            </div>}
        </div>
    );
}

export default BoardColumn;