import type { FC } from "react";
import { useEffect, Children } from "react";
import { useUnit } from "effector-react";
import { Spin } from "antd";
// import { useState } from "react";
// import Modal from "antd/es/modal/Modal";
import { dashboardData } from "../context/model/process";
import type { BoardColumnModelType } from "@app/types/model/board";

import BoardColumn from "./BoardColumn";

const Board: FC = () => {
  const { store, error, loading } = useUnit(dashboardData);
  console.log("store", store) // !
  console.log("store?.dashboard?.id", store?.dashboard?.id) // !

  return (
    <Spin spinning={loading}>
      <div className="flex gap-3">
        {Children.toArray((store.steps || []).map((column: BoardColumnModelType) => <BoardColumn dashboardId={store?.dashboard?.id} column={column} />))}
      </div>
    </Spin>
  );

}

export default Board;
