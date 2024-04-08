import type { FC } from "react";
import { useForm } from '@filledout/react';
import { $$taskCreateForm } from '@context/model/task';
// import { dashboardData } from '@context/model/process';
// import InputField from '@form/input';
import { preventDefault } from "../scripts/ui-utils";
import InputField from "@form/Input";
import TextAreaField from "@form/TextArea";

/** Создание новой задачи */
const TaskCreate: FC = () => {
  const { onSubmit, fields } = useForm($$taskCreateForm);

  return (
    <form
      onSubmit={() => {
        preventDefault
        onSubmit();
      }}
    >
      <InputField field={fields.title} label="Название задачи" placeholder="Укажите название" />
      <TextAreaField field={fields.description} label="Описание задачи" placeholder="Укажите описание" />
      {/* <TextAreaField controller={controller({ name: 'description' })} label={'Описание'} />
      <SelectField controller={controller({ name: 'process' })} label="Процесс" options={getProcessesToSelect()} /> */}
    </form>
  );
};

export default TaskCreate;
