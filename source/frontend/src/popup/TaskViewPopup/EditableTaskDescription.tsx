import { useCallback, useState } from "react";
import type { FC, ChangeEvent } from "react";
import { Button, Flex, Input, Space } from 'antd';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { TaskModel } from "@app/types/model/task";

const { TextArea } = Input;

interface EditableTaskDescriptionProps {
  editableTask: TaskModel;
  task: TaskModel;
  dispatchTaskEdit: (values: { description: string }) => void;
  onSave: () => void;
  onReset: () => void;
}

export const EditableTaskDescription: FC<EditableTaskDescriptionProps> = (props) => {
  const { task, editableTask, dispatchTaskEdit, onSave, onReset } = props;
  const [descriptionEditing, setDescriptionEditing] = useState(false);

  const handleSave = useCallback(() => {
    onSave();
    setDescriptionEditing(false)
  }, [onSave]);

  const handleReset = useCallback(() => {
    onReset();
    setDescriptionEditing(false)
  }, [onReset]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    dispatchTaskEdit({ description: value });
  }

  return (descriptionEditing ? (
    <Flex>
      <Space>
        <TextArea
          value={editableTask.description}
          onChange={handleInputChange}
          style={{ width: '400px' }}
        />
        <Button type="dashed" icon={<CloseOutlined />} onClick={handleReset}></Button>
        <Button type="primary" icon={<CheckOutlined />} onClick={handleSave}></Button>
      </Space>
    </Flex>
  ) : (
    <div onClick={() => setDescriptionEditing(true)}>
      {task.description}
    </div>
  ));
}