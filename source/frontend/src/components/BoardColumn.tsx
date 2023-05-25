import React from 'react';
import type { BoardCardItemType } from "@app/types/model/board";
import ColumnItem from "./ColumnItem";
import "../style/BoardColumn.css";

interface BoardColumnProps {
    name: string;
    total: number;
    current: number;
    items: Array<BoardCardItemType>;
    search?: string;
    filters?: {
        status?: string;
        step?: string;
        department?: string;
    }
}

const BoardColumn: React.FC<BoardColumnProps> = props => {
    const { name, total, current, items, search } = props;

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
                {items.filter(e => e.title.toLocaleLowerCase().includes((search || "").toLocaleLowerCase())).map(e => (
                    <ColumnItem key={e.id} title={e.title} tagText={e.step} id={e.id} />
                ))}
            </div>}
        </div>
    );
}

export default BoardColumn;
