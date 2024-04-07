import type { FC } from 'react';
import { useStoreMap } from 'effector-react';
import { Button, Flex, Input, Space, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { $currentTask, currentTaskUpdate } from '@context/model/task';
import { useEditMode } from "../../scripts/ui-utils";

const { Title } = Typography;

const EditableTaskTitle: FC = () => {
  const title = useStoreMap($currentTask, task => task.title || '');

  const { value, valueChange, editMode, handleSave, handleReset, openEditMode } = useEditMode(
    title,
    title => currentTaskUpdate({ title })
  );

  if (editMode) {
    return (
      <Flex>
        <Space>
          <Input value={value} onChange={valueChange} style={{ width: 480 }} placeholder="Укажите название задачи" />
          <Button type="text" icon={<CloseOutlined />} onClick={handleReset}></Button>
          <Button type="link" icon={<CheckOutlined />} onClick={handleSave}></Button>
        </Space>
      </Flex>
    );
  }

  return <Title level={3} onClick={openEditMode}>{title}</Title>;
};

export default EditableTaskTitle;
