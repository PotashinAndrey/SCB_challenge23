import type { FC } from "react";
import { useEffect, Children } from "react";
import { useUnit } from "effector-react";
// import { useState } from "react";
// import Modal from "antd/es/modal/Modal";
import { dashboardData } from "../context/model/process";
import type { BoardColumnModelType } from "@app/types/model/board";

import BoardColumn from "./BoardColumn";

// import "../style/Board.css";
// import CandidateCreate from "../pages/CandidateCreate";
// import Paper from "../ui/Paper";
import { appliedCandidetesFx } from "../context/model/applicant";

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

const columns2 = [{
  key: "new",
  name: "Новые кандидаты"
},
{
  key: "interview",
  name: "На интервью"
},
{
  key: "test",
  name: "Тестовое задание"
},
{
  key: "done",
  name: "Оформление"
}]


const Board: FC = () => {
  const { store, error, loading } = useUnit(dashboardData);
  useEffect(() => console.log(store), [store]); // !

  useEffect(() => { appliedCandidetesFx() }, []);

  return (
    <div className="flex gap-3">
      {Children.toArray(columns.map(column => <BoardColumn column={column} />))}
    </div>
  );

}

export default Board;
