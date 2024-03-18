import { useMemo, type FC, type PropsWithChildren, type ChangeEvent } from "react";
import { Flex, Select, Typography } from "antd";
import { useStore } from "effector-react";

import { dashboardData } from '../../context/model/process';
import { TaskModel } from "@app/types/model/task";
import { UUID } from "crypto";

const { Text } = Typography;

interface TaskActionRowProps {
  text: string;
}

const TaskActionRow: FC<TaskActionRowProps & PropsWithChildren> = (props) => {
  const { text, children } = props;

  return (
    <Flex>
      <Text style={{ marginRight: "10px" }}>
        {text}
      </Text>
      {children}
    </Flex>
  );
}

interface TaskActionsProps {
  task: TaskModel;
  editableTask: TaskModel;
  dispatchTaskEdit: (values: { process: UUID }) => void;
}

export const TaskActions: FC<TaskActionsProps> = (props) => {
  const { task, editableTask, dispatchTaskEdit } = props;
  const dashboard = useStore(dashboardData.$store);

  const processesToSelect = useMemo(() => {
    const baseOptions =
      dashboard?.processes?.map((proc: any) => ({
        value: proc.id,
        label: proc.name,
      })) ?? [];
    return [{ label: 'Выберите процесс', value: '', disabled: true }, ...baseOptions];
  }, [dashboard]);

  const handleProcessChange = (id: UUID) => {
    dispatchTaskEdit({ process: id });
  }

  return (
    <>
      <TaskActionRow text="Процесс: " >
        <Select
          options={processesToSelect}
          aria-label="sda"
          value={editableTask?.process}
          onChange={handleProcessChange}
          style={{ minWidth: '220px' }}
        />
      </TaskActionRow>
    </>
  );
}