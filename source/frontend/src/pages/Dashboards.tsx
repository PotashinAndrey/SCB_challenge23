import type { FC } from 'react';
import { Button, List } from 'antd';
import { useUnit } from 'effector-react';
import { Link } from 'atomic-router-react';
import { routing } from '@context/router';
import { dashboardsListQuery, createDashboardPopup } from '@context/model/dashboard';
import PageList from '@ui/PageList';

const { Item } = List;
const { Meta } = Item;

const Dashboards: FC = () => {
  const { data: dasboardsList } = useUnit(dashboardsListQuery);
  const { open: openCrateDashboardPopup } = useUnit(createDashboardPopup);

  return (
    <>
      <PageList
        caption="Доски"
        description="Список дашбордов проекта"
        dataSource={dasboardsList}
        loading={false}
        renderItem={(item) => (
          <Item
            actions={[<a key="list-loadmore-edit">редактировать</a>, <a key="list-loadmore-more">удалить</a>]}
          >
            <Meta
              title={<Link to={routing.dashboard.view} params={{ dashboard: item.id }}>{item.name}</Link>}
              description={item.description}
            />
          </Item>
        )}
      >
        <Button onClick={() => openCrateDashboardPopup()} type="primary">
          Создать Дашборд
        </Button>
      </PageList>
    </>
  );
};

export default Dashboards;
