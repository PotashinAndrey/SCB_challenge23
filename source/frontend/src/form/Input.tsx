import type { FC } from 'react';
import { Input } from 'antd';
import Field, { useFieldProps, type FieldProps } from './Field';

type InputProps = FieldProps<string> & { placeholder?: string, password?: boolean };

const InputField: FC<InputProps> = props => {
  const { label, field, placeholder, password = false } = props;
  const { value, onChange, error } = useFieldProps(field);

  return (
    <Field label={label} field={field}>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        status={error !== null ? "error" : undefined}
        placeholder={placeholder}
        type={password ? "password" : undefined}
      />
    </Field>
  );
};

export default InputField;
