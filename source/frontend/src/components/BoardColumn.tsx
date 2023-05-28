import { FC, useMemo } from 'react';
import { Children } from 'react';
import { useStoreMap } from 'effector-react';
import { Typography } from 'antd';
import { $dashboardDataTasks } from "../context/model/process";
import type { BoardColumnModelType } from "@app/types/model/board";
import BoardTask from "./BoardTask";

import "../style/BoardColumn.css";

const { Text } = Typography

interface BoardColumnProps {
  column: BoardColumnModelType;
}

const items = [{
  name: "first item",
  step: "yellow tag",
  id: "someID4"
}, {
  name: "second item",
  step: "yellow tag",
  id: "someID5"
}, {
  name: "third item",
  step: "yellow tag",
  id: "someID6"
}, {
  name: "fourth item",
  step: "yellow tag",
  id: "someID7"
}];

const BoardColumn: FC<BoardColumnProps> = props => {
  const { column } = props;
  const { name } = column;

  const tasks = useStoreMap({
    store: $dashboardDataTasks,
    fn: dashboardDataTasks => dashboardDataTasks.filter((t: any) => t.step === column.id),
    keys: [column],
    defaultValue: []
  });

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
        <Text>{name}</Text>
        {/* <span>{`${count} / ${total}`}</span> */}
      </h4>

      <div className="column-content">
        {Children.toArray(tasks.map((t: any) => <BoardTask task={{ id: t.task, name: t.name, step: "lime tag" }} />))}
      </div>

      {/* todo: убрать это */}
      {!tasks.length && items?.length && <div className="column-content">
        {Children.toArray(items.map(e => <BoardTask task={e} />))}
      </div>}
    </div>
  );
}

export default BoardColumn;
