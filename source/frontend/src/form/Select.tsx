import { Select } from 'antd';
import { useField } from '@filledout/react';
import type { OptionType } from '@app/types/app';
import Field, { type FieldProps } from './Field';

type SelectProps<FormValues, FieldType extends string> = FieldProps<FormValues, FieldType> & { placeholder?: string, options: Array<OptionType<FieldType>> };

const SelectField = <FormValues, FieldType extends string, >(props: SelectProps<FormValues, FieldType>) => {
  const { label, field, placeholder, options } = props;
  const { value, onChange, errors } = useField(field);

  return (
    <Field label={label} field={field}>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        status={errors !== null ? "error" : undefined}
        placeholder={placeholder}
      />
    </Field>
  );
};

export default SelectField;
