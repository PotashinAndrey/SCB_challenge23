import type { FC } from 'react';
import { useEffect } from 'react';
import { Avatar, Button, List, Typography } from 'antd';
import { useStore, useUnit } from 'effector-react';
import PageList from '../ui/PageList';
import { DashboardModel } from '@app/types/model/dashboard';
import { $dashboardsList, createDashboardPopup } from '../context/model/dashboard';

import '../style/Dashboards.css';

const Dashboards: FC = () => {
  const dasboardsList = useStore<DashboardModel[]>($dashboardsList);
  const {open: openCrateDashboardPopup} = useUnit(createDashboardPopup);

  return (
    <>
      <PageList
        caption="Доски"
        description="Список дашбордов проекта"
        dataSource={dasboardsList}
        loading={false}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={item.description}
            />
          </List.Item>
        )}
      >
        <div>
          <Button onClick={openCrateDashboardPopup} type="primary">Создать Дашборд</Button>
        </div>
      </PageList>
    </>
  );
};

export default Dashboards;
