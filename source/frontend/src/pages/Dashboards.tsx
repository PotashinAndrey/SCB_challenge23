import type { FC } from 'react';
import { Button, List } from 'antd';
import { useUnit } from 'effector-react';
import { Link } from 'atomic-router-react';
import { routing } from '@context/router';
import { dashboardsListQuery, dashboardCreatePopup } from '@context/model/dashboard';
import PageList from '@ui/PageList';

const { Item } = List;
const { Meta } = Item;

const Dashboards: FC = () => {
  const { data: dasboardsList } = useUnit(dashboardsListQuery);
  const { open } = useUnit(dashboardCreatePopup);

  return (
    <>
      <PageList
        caption="Доски"
        description="Список досок в проекте"
        dataSource={dasboardsList}
        loading={false}
        renderItem={dashboard => (
          <Item
            actions={[
              <a key="list-loadmore-edit">редактировать</a>,
              <a key="list-loadmore-more">удалить</a>
            ]}
          >
            <Meta
              title={<Link to={routing.dashboard.view} params={{ dashboard: dashboard.id }}>{dashboard.name}</Link>}
              description={dashboard.description}
            />
          </Item>
        )}
      >
        <Button onClick={open} type="primary">Создать новую доску</Button>
      </PageList>
    </>
  );
};

export default Dashboards;
