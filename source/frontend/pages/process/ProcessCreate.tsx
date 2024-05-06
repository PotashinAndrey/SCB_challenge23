import type { FC, ReactNode, PropsWithChildren } from 'react';
import type { PropsWithClassName } from '@app/types/ui';
import { Button, List, Spin, Typography } from 'antd';
// import cn from 'classnames';
import { processCreateStepAppendPopup } from '@context/model/process';
import Paper from '@ui/Paper';
import Caption from '@ui/Caption';

const { Text } = Typography;

// type ProcessCreateProps = {
//   : ;
//   test?: string;
// }

/** ProcessCreate -  */
const ProcessCreate: FC = () => {
  // const { , test = "" } = props;

  const dataSource: Array<any> = [];
  const renderItem = () => <></>;

  return (
    <div className="w-main margin-center mt-content mb-content">
      <div className="ta-c mb-8">
        {<Caption>Создание процесса найма</Caption>}
        {<Text>Выберите отдел и укажите шаги процесса найма сотрудника</Text>}
      </div>

      <Paper className="primary bordered">
        <Paper className="primary mb-4 bordered no-shadow">дропдавн с отделами</Paper>

        <List size="large" itemLayout="horizontal" dataSource={dataSource} renderItem={renderItem} />
      </Paper>

      <div className="ta-c mt-8">
        <p>
          <Button type="primary" onClick={() => processCreateStepAppendPopup.open()}>
            Добавить шаг процесса найма
          </Button>
        </p>
        <p className="mt-4">
          <Button>Сохранить процесс</Button>
        </p>
      </div>
    </div>
  );
};

export default ProcessCreate;
