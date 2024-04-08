import { Input } from 'antd';
import { useField } from '@filledout/react';
import Field, { type FieldProps } from './Field';

const { TextArea } = Input;

type TextAreaProps<V> = FieldProps<V, string> & { placeholder?: string };

const TextAreaField = <V,>(props: TextAreaProps<V>) => {
  const { label, field, placeholder } = props;
  const { value, onChange, errors } = useField(field);

  return (
    <Field label={label} field={field}>
      <TextArea
        value={value}
        onChange={e => onChange(e.target.value)}
        status={errors !== null ? "error" : undefined}
        placeholder={placeholder}
      />
    </Field>
  );
};

export default TextAreaField;
