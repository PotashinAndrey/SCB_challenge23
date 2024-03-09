import type { FC } from "react";
import { useEffect, Children, useMemo } from "react";
import { useUnit } from "effector-react";
import { Spin } from "antd";
import { dashboardData } from "../context/model/process";
import type { BoardColumnModelType } from "@app/types/model/board";

import BoardColumn from "./BoardColumn";

const Board: FC = () => {
  const { store, error, loading } = useUnit(dashboardData);

  const boardColumns = useMemo(() => {
    return (store.steps || []).map((column: BoardColumnModelType) => <BoardColumn dashboardId={store?.dashboard?.id} column={column} />);
  }, [store]);

  return (
    <Spin spinning={loading}>
      <div className="flex gap-3">
        {Children.toArray(boardColumns)}
      </div>
    </Spin>
  );

}

export default Board;
