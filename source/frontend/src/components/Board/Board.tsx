import React from "react";

import { BoardCardItemType } from "@app/types/model/board";

import "./Board.css";
import BoardColumn from "../BoardColumn/BoardColumn";

interface BoardProps {
    columns: Array<{
        name: string;
        totalItemsNumber: number;
        displayedItemsNumber: number;
        items: Array<BoardCardItemType>;
    }>;
}

const Board: React.FC<BoardProps> = ({ columns }) => {

    return (
        <div className="board-component boxAndRadius">
            {columns.map(e => (
                <BoardColumn
                    key={e.name}
                    items={e.items}
                    name={e.name}
                    total={e.totalItemsNumber}
                    current={e.displayedItemsNumber}
                />
            ))}
        </div>
    );
}

export default Board;
