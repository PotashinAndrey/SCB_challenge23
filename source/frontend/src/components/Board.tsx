import type { FC } from "react";
import { useEffect, Children } from "react";
import { useUnit } from "effector-react";
import { Spin } from "antd";
// import { useState } from "react";
// import Modal from "antd/es/modal/Modal";
import { dashboardData } from "../context/model/process";
import type { BoardColumnModelType } from "@app/types/model/board";

import BoardColumn from "./BoardColumn";

// import "../style/Board.css";
// import CandidateCreate from "../pages/CandidateCreate";
// import Paper from "../ui/Paper";
// import { appliedCandidetesFx } from "../context/model/applicant";
// import { dashboardPageOpen, dashboardColumnsData } from "../context/model/dashboard";

const Board: FC = () => {
  const { store, error, loading } = useUnit(dashboardData);
  // const { store } = useUnit(dashboardColumnsData);
  console.log("store", store) // !
  console.log("store?.dashboard?.id", store?.dashboard?.id) // !
  

  // useEffect(() => {
  //   appliedCandidetesFx();
  //   dashboardPageOpen("b536fdd7-d90a-4595-8fdc-d4b0f88158f7");
  // }, []);

  // console.log(columnsData)

  return (
    <Spin spinning={loading}>
      <div className="flex gap-3">
        {Children.toArray((store.steps || []).map((column: BoardColumnModelType) => <BoardColumn dashboardId={store?.dashboard?.id} column={column} />))}
      </div>
    </Spin>
  );

}

export default Board;
