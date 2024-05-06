import type { FC } from 'react';
import { Avatar, List, Button } from 'antd';
import { useUnit } from 'effector-react';
import { projectListQuery, projectCreateMutation } from '@context/model/project';
import PageList from '@ui/PageList';

const Projects: FC = () => {
  const { data, pending } = useUnit(projectListQuery);

  return (
    <PageList
      caption="Проекты"
      description="Список проектов команды"
      loading={pending}
      dataSource={data.items}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />} title={item.name} />
        </List.Item>
      )}
    >
      <Button onClick={() => projectCreateMutation.start({ name: "test", company: window.crypto.randomUUID() })} type="primary">
        Создать новый проект
      </Button>
    </PageList>
  );
};

export default Projects;
