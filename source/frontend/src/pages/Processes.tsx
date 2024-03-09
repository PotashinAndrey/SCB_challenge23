import type { FC } from "react";
import { Avatar, Button, List, Descriptions } from 'antd';
import { useUnit } from "effector-react";
import { routing } from "../context/router";
import { processesListData } from "../context/model/process";
import PageList from "../ui/PageList";

const Dashboards: FC = () => {
  const { store, loading } = useUnit(processesListData);

  return (
    <PageList
      caption="Процессы найма сотрудников"
      description="Обзор всех процессов найма сотрудников"
      loading={loading}
      dataSource={(store?.items || []) as Array<any>}
      renderItem={(item, index) => (
        <List.Item onClick={() => routing.dashboard.open({ dashboard: item.id })}>
          <pre>{JSON.stringify(item, null, 2)}</pre>
          {/* <List.Item.Meta
            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} size={60} />}
            title={item.name}
            description={(
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Отдел / Команда">{item.project.name}</Descriptions.Item>
                <Descriptions.Item label="Описание">{item.description}</Descriptions.Item>
              </Descriptions>
            )}
          /> */}
        </List.Item>
      )}
    >
      <Button type="primary" onClick={() => routing.processCreate.open()}>Добавить процесс найма</Button>
    </PageList>
  );
}

export default Dashboards;
