import { Input } from 'antd';
import { useField } from '@filledout/react';
import Field, { type FieldProps } from './Field';

type InputProps<V> = FieldProps<V, string> & { placeholder?: string, password?: boolean };

const InputField = <V,>(props: InputProps<V>) => {
  const { label, field, placeholder, password = false } = props;
  const { value, onChange, errors } = useField(field);

  return (
    <Field label={label} field={field}>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        status={errors !== null ? "error" : undefined}
        placeholder={placeholder}
        type={password ? "password" : undefined}
      />
    </Field>
  );
};

export default InputField;
