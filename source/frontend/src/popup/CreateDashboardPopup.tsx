import type { FC } from 'react';
import { useUnit } from 'effector-react';
import { Modal, Button, Typography, Flex } from 'antd';
// import { createFieldArray, useFieldArray, useForm } from 'effector-react-form';
import { $canAddNewColumn, createDashboardPopup, createDashbordForm, createDashbordFormSubmit } from '@context/model/dashboard';
import { InputField, TextAreaField } from '@form/input';

import Paper from '@ui/Paper';

const hide = () => createDashboardPopup.close();
const { Text } = Typography;

/** CreateDashboardPopup -  */
const CreateDashboardPopup: FC = () => {
  // const { visible } = useUnit(createDashboardPopup);
  // const canAdd = useUnit($canAddNewColumn);
  // const { controller } = useForm({ form: createDashbordForm });

  // const fieldArray = createFieldArray({ form: createDashbordForm });
  // const { map, push, remove } = useFieldArray({ fieldArray, name: 'columns' });

  // const handleCreateDashboard = () => {
  //   createDashbordFormSubmit();
  // };

  return (
    <>123</>
    // <Modal
    //   open={visible}
    //   width={800}
    //   closable
    //   onCancel={hide}
    //   title="Создание новой доски"
    //   // centered
    //   footer={[
    //     <Button type="primary" key="create" onClick={handleCreateDashboard}>
    //       Создать
    //     </Button>
    //   ]}
    // >
    //   <InputField controller={controller({ name: 'name' })} label={'Название'} />
    //   <TextAreaField controller={controller({ name: 'description' })} label={'Описание'} />
    //   <Text>Столбцы:</Text>
    //   <Paper>
    //     {map(({ field, formItemName, index }) => (
    //       <Flex justify="space-between" align="center">
    //         <InputField controller={controller({ name: formItemName })} label={`Столбец ${index}`} />
    //         <Button onClick={() => remove(index)} danger>
    //           удалить
    //         </Button>
    //       </Flex>
    //     ))}
    //   </Paper>
    //   {canAdd && (
    //     <Button
    //       onClick={() => {
    //         push('');
    //       }}
    //     >
    //       Добавить столбец
    //     </Button>
    //   )}
    // </Modal>
  );
};

export default CreateDashboardPopup;
