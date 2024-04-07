import type { FC } from 'react';
import { Layout } from "antd";
import EditableTaskDescription from '@component/task/EditableTaskDescription';
import TaskActions from '@component/task/TaskActions';

const { Content, Sider } = Layout;

const Task: FC = () => (
  <Layout>
    <Content>
      <EditableTaskDescription />
    </Content>

    <Sider width="30%">
      <TaskActions />
    </Sider>
  </Layout>
);

export default Task;
