import type { FC } from "react";
import { Children } from "react";
// import { useState } from "react";
// import Modal from "antd/es/modal/Modal";
import type { BoardColumnModelType } from "@app/types/model/board";

import BoardColumn from "./BoardColumn";

// import "../style/Board.css";
// import CandidateCreate from "../pages/CandidateCreate";
// import Paper from "../ui/Paper";

const columns: Array<BoardColumnModelType> = [{
  name: "solo",
  total: 13,
  count: 2,
  items: [{
    name: "first item",
    step: "yellow tag",
    id: "someID1"
  }, {
    name: "second item",
    step: "yellow tag",
    id: "someID2"
  }, {
    name: "third item",
    step: "yellow tag",
    id: "someID3"
  }]
}, {
  name: "waagh",
  total: 4,
  count: 3,
  items: [{
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
  }]
}];


// type BoardProps = {
//   columns: Array<BoardColumnModelType>;
// }

const Board: FC = () => {
  // const { columns } = props;
  // const [open, setOpen] = useState(false);

  // const handleClose = () => setOpen(false);

  return (
    <div className="flex gap-3">
      {Children.toArray(columns.map(column => <BoardColumn column={column} />))}
    </div>
  );

        {/* <div className="board-header">
                <div className="board-header-search-filters">
                  {columns.map(column => (
                  <BoardColumn
                    // search={search}
                    key={column.name}
                    column={column}
                    // items={column.items}
                    // name={column.name}
                    // total={column.totalItemsNumber}
                    // current={column.displayedItemsNumber}
                  />
                ))}
                </div>
            </div> */}

      {/* <div className="board-component"> */}

      {/* </div> */}
      {/* <Modal title="Добавление кандидата" open={open} onOk={handleCreate} onCancel={handleClose} width={700}>
                <CandidateCreate />
            </Modal> */}
}

export default Board;
