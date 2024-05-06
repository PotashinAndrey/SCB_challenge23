import type { FC } from "react";
import { Typography, Button, List } from 'antd';
import { useStoreMap } from 'effector-react';
import { useForm } from '@effector-reform/react';
import { $$dashboardCreateForm, dashboardCreateFormProcessAppend } from '@context/model/dashboard';
import InputField from "@form/Input";
import TextAreaField from "@form/TextArea";

const { Text } = Typography;
const { Item } = List;
const { Meta } = Item;

/** Создание новой задачи */
const DashboardCreate: FC = () => {
  const { onSubmit, fields } = useForm($$dashboardCreateForm);
  const processes = useStoreMap($$dashboardCreateForm.$values, values => values.processes || []);

  return (
    <form onSubmit={onSubmit}>
      <InputField field={fields.title} label="Название" placeholder="Название доски" />
      <TextAreaField field={fields.description} label="Описание доски" placeholder="Описание доски" />
      <Text>Столбцы:</Text>

      <List
        size="large"
        itemLayout="horizontal"
        dataSource={processes}
        renderItem={process => (
          <Item
            // key={process.id}
            actions={[
              <a key="list-loadmore-edit">вверх</a>,
              <a key="list-loadmore-edit">вниз</a>,
              <a key="list-loadmore-edit">редактировать</a>,
              <a key="list-loadmore-edit">действия</a>,
              <a key="list-loadmore-more">удалить</a>
            ]}
          >
            <Meta
              title={process.title}
              description={process.description}
            />
          </Item>
        )}
      />

      <Button onClick={() => { dashboardCreateFormProcessAppend() }}>Добавить столбец</Button>
    </form>
  );
};

export default DashboardCreate;
