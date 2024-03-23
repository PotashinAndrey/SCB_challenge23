import { useCallback, useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Button, Flex, Input, Space } from 'antd';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { TaskModel } from '@app/types/model/task';

interface EditableTaskTitleProps {
  editableTask: TaskModel;
  task: TaskModel;
  dispatchTaskEdit: (values: { title: string }) => void;
  onSave: () => void;
  onReset: () => void;
}

export const EditableTaskTitle: FC<EditableTaskTitleProps> = (props) => {
  const { task, editableTask, dispatchTaskEdit, onSave, onReset } = props;

  const [titleEditing, setTityleEditing] = useState(false);

  const handleSave = useCallback(() => {
    onSave();
    setTityleEditing(false);
  }, [onSave]);

  const handleReset = useCallback(() => {
    onReset();
    setTityleEditing(false);
  }, [onReset]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatchTaskEdit({ title: value });
  };

  return titleEditing ? (
    <Flex>
      <Space>
        <Input value={editableTask.title} onChange={handleInputChange} style={{ width: '400px' }} />
        <Button type="dashed" icon={<CloseOutlined />} onClick={handleReset}></Button>
        <Button type="primary" icon={<CheckOutlined />} onClick={handleSave}></Button>
      </Space>
    </Flex>
  ) : (
    <div style={{ margin: '4px 0 12px 0' }} onClick={() => setTityleEditing(true)}>
      {task.title}
    </div>
  );
};
