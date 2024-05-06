import type { UUID } from 'crypto';
import type { FC } from 'react';
import { useCallback } from 'react';
import { useUnit } from 'effector-react';
import { Select, Descriptions } from 'antd';
import { $currentTask, currentTaskUpdate } from '@context/model/task';
import { $processesOptions } from '@context/model/process';

const { Item } = Descriptions;

const TaskActions: FC = () => {
  const { task, processes } = useUnit({
    task: $currentTask,
    processes: $processesOptions
  });

  const value = processes
    .find(process => process.value === task.process)
    ?.value;

  const processChangeHandler = useCallback((process: UUID) => currentTaskUpdate({ process }), []);

  return (
    <Descriptions layout="vertical">
      <Item label="Процесс">
        <Select
          options={processes}
          value={value}
          onChange={processChangeHandler}
          style={{ width: "100%" }}
        />
      </Item>
    </Descriptions>
  )
};

export default TaskActions;
