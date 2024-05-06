import { Select } from 'antd';
import type { OptionType } from '@app/types/app';
import Field, { useFieldProps, type FieldProps } from './Field';

type SelectProps<FieldType extends string> = FieldProps<FieldType> & { placeholder?: string, options: Array<OptionType<FieldType>> };

const SelectField = <FieldType extends string, >(props: SelectProps<FieldType>) => {
  const { label, field, placeholder, options } = props;
  const { value, onChange, error } = useFieldProps(field);

  return (
    <Field label={label} field={field}>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        status={error !== null ? "error" : undefined}
        placeholder={placeholder}
      />
    </Field>
  );
};

export default SelectField;
