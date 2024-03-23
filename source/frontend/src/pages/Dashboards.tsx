import type { FC } from 'react';
import { Button, List } from 'antd';
import { useStore, useUnit } from 'effector-react';
import { $dashboardsList, createDashboardPopup } from '@context/model/dashboard';
import PageList from '@ui/PageList';
import type { DashboardModel } from '@app/types/model/dashboard';

const Dashboards: FC = () => {
  const dasboardsList = useStore<DashboardModel[]>($dashboardsList);
  const { open: openCrateDashboardPopup } = useUnit(createDashboardPopup);

  return (
    <>
      <PageList
        caption="Доски"
        description="Список дашбордов проекта"
        dataSource={dasboardsList}
        loading={false}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.name} description={item.description} />
          </List.Item>
        )}
      >
        <Button onClick={openCrateDashboardPopup} type="primary">
          Создать Дашборд
        </Button>
      </PageList>
    </>
  );
};

export default Dashboards;
