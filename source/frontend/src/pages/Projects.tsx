import type { FC } from 'react';
import { useEffect } from 'react';
import { Avatar, List } from 'antd';
import { useUnit } from 'effector-react';
import PageList from '../ui/PageList';

import type { ProjectModel } from '@app/types/model/projects';
import { projectListData, projectPageOpen } from '../context/model/project';

const Projects: FC = () => {
  const { store, loading } = useUnit(projectListData);

  useEffect(projectPageOpen, []);

  return (
    <PageList
      caption="Проекты"
      description="Список проектов команды"
      loading={loading}
      dataSource={(store?.items || []) as ProjectModel[]}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
              />
            }
            title={item.name}
          />
        </List.Item>
      )}
    />
  );
};

export default Projects;
