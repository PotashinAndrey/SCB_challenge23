import type { FC } from 'react';
import { useStoreMap } from 'effector-react';
import { Button, Flex, Input, Space, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { $currentTask, currentTaskUpdate } from '@context/model/task';
import { useEditMode } from "../../scripts/ui-utils";

const { TextArea } = Input;
const { Text } = Typography;

const EditableTaskDescription: FC = () => {
  const description = useStoreMap($currentTask, task => task.description || '');

  const { value, valueChange, editMode, handleSave, handleReset, openEditMode } = useEditMode(
    description,
    description => currentTaskUpdate({ description })
  );

  if (editMode) {
    return (
      <Flex>
        <Space>
          <TextArea value={value} onChange={valueChange} style={{ width: 480 }} placeholder="Укажите описание задачи" />
          <Button type="text" icon={<CloseOutlined />} onClick={handleReset}></Button>
          <Button type="link" icon={<CheckOutlined />} onClick={handleSave}></Button>
        </Space>
      </Flex>
    )
  }

  return <Text onClick={openEditMode}>{description}</Text>
};

export default EditableTaskDescription;
