import type { FC, SyntheticEvent } from "react";
import { useCallback } from "react";
import { useUnit } from "effector-react";
import { useForm } from '@filledout/react';
import { $$taskCreateForm } from '@context/model/task';
import { $processesOptions } from '@context/model/process';
import InputField from "@form/Input";
import TextAreaField from "@form/TextArea";
import SelectField from "@form/Select";
import { preventDefault } from "../scripts/ui-utils";

/** Создание новой задачи */
const TaskCreate: FC = () => {
  const { onSubmit, fields } = useForm($$taskCreateForm);

  const processes = useUnit($processesOptions);

  const submit = useCallback(<T extends SyntheticEvent<E>, E>(event: T) => {
    preventDefault(event);
    onSubmit();
  }, [onSubmit]);

  return (
    <form onSubmit={submit}>
      <InputField field={fields.title} label="Название задачи" placeholder="Укажите название" />
      <TextAreaField field={fields.description} label="Описание задачи" placeholder="Укажите описание" />
      <SelectField field={fields.process} label="Процесс" options={processes} />
    </form>
  );
};

export default TaskCreate;
