import type { FC } from 'react';
import { Avatar, Button, List, Descriptions } from 'antd';
import { useUnit } from 'effector-react';
import { routing } from '@context/router';
// import { processesListData } from '@context/model/process';
import PageList from '@ui/PageList';

const Processes: FC = () => {
  // const { store, loading } = useUnit(processesListData);

  return (
    123
    // <PageList
    //   caption="Процессы найма сотрудников"
    //   description="Обзор всех процессов найма сотрудников"
    //   loading={loading}
    //   dataSource={(store?.items || []) as Array<any>}
    //   renderItem={(item, index) => (
    //     <List.Item onClick={() => routing.dashboard.view.open({ dashboard: item.id })}>
    //       <pre>{JSON.stringify(item, null, 2)}</pre>
    //     </List.Item>
    //   )}
    // >
    //   <Button type="primary" onClick={() => routing.processCreate.open()}>
    //     Добавить процесс найма
    //   </Button>
    // </PageList>
  );
};

export default Processes;
