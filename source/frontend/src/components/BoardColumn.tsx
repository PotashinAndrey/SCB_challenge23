import type { FC } from 'react';
import { Children } from 'react';
import type { BoardColumnModelType } from "@app/types/model/board";
import ColumnItem from "./ColumnItem";

import "../style/BoardColumn.css";

interface BoardColumnProps {
  column: BoardColumnModelType;
  // name: string;
  // total: number;
  // current: number;
  // items: Array<BoardCardItemType>;
  // search?: string;
  // filters?: {
  //     status?: string;
  //     step?: string;
  //     department?: string;
  // }
}

const BoardColumn: FC<BoardColumnProps> = props => {
  const { column } = props;
  const { name, items = [], count, total } = column;

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
        <span>{`${count} / ${total}`}</span>
      </h4>
      {items?.length && <div className="column-content">
        {/* {items.filter(e => e.name.toLocaleLowerCase().includes((search || "").toLocaleLowerCase())).map(e => ( */}
          {Children.toArray(items.map(e => <ColumnItem task={e} />))}
        {/* ))} */}
      </div>}
    </div>
  );
}

export default BoardColumn;
