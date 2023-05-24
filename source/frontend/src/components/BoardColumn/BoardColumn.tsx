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

    const onDragOverHandler = (event: any) => {
        event.preventDefault();
    }

    const handleDrop = (event: any) => {
        console.log(event.dataTransfer.getData("itemId"))
        //тут денруть запрос на бек и проверить можно ли переместить элдемент(если да то передернуть данные если нет то оставить все на месте)
    }

    return (
        <div className="column-component boxAndRadius" onDrop={handleDrop} onDragOver={onDragOverHandler}>
            <h4 className="column-header">
                <span>{name}</span>
                <span>{`${current}/${total}`}</span>
            </h4>
            {items && <div className="column-content">
                {items.map(e => (
                    <ColumnItem key={e.id} title={e.title} tagText={e.step} id={e.id} />
                ))}
            </div>}
        </div>
    );
}

export default BoardColumn;