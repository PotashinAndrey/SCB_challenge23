import { FC, useEffect, useMemo } from "react";
import { useUnit } from "effector-react";
import { useForm } from 'effector-react-form';
import { vacanciesListData, vacancyCreatePopup } from "../context/model/vacancy";
import { createVacancyPopupOpen, departamentListData } from "../context/model/department";
import { Modal, Button } from 'antd';
import { InputField, TextAreaField } from "../form/input";
import { newVacancyForm, newVacancyFormSubmit } from "../context/vacancy";
import { SelectField } from "../form/select";
import { DepartmentModel } from "@app/types/model/department";

/** VacancyCreate -  */
const VacancyCreate: FC = () => {
  const { open, close, visible, popupData } = useUnit(vacancyCreatePopup);
  const { controller, handleSubmit } = useForm({ form: newVacancyForm });
  const { store, loading } = useUnit(departamentListData);

  useEffect(createVacancyPopupOpen, []);
  const options = useMemo(() => {
    return (store?.items || []).map((e: DepartmentModel) => ({
      value: e.id,
      label: e.name
    }));
  }, [store]);

  console.log(store)

  const handleCancel = () => {
    newVacancyForm.reset()
    vacancyCreatePopup.close()
  }
  return (
    <Modal
      open={visible}
      width={800}
      closable={true}
      onCancel={() => vacancyCreatePopup.close()}
      footer={[
        <Button type="primary" key="goOn" onClick={newVacancyFormSubmit}>
          Создать
        </Button>,
        <Button danger key="reject" onClick={handleCancel}>
          Отменить
        </Button>,

      ]}
    >
      <InputField controller={controller({ name: "name" })} label={"Название вакансии"} />
      <TextAreaField controller={controller({ name: "description" })} label={"Описание"} />
      <SelectField controller={controller({ name: "department" })} label={"Департамент"} options={options} />

    </Modal>
  );
};

export default VacancyCreate;
