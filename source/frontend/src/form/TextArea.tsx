import type { FC } from 'react';
import { Input } from 'antd';
import Field, { useFieldProps, type FieldProps } from './Field';

const { TextArea } = Input;

type TextAreaProps = FieldProps<string> & { placeholder?: string };

const TextAreaField: FC<TextAreaProps> = props => {
  const { label, field, placeholder } = props;
  const { value, onChange, error } = useFieldProps(field);

  return (
    <Field label={label} field={field}>
      <TextArea
        value={value}
        onChange={e => onChange(e.target.value)}
        status={error !== null ? "error" : undefined}
        placeholder={placeholder}
      />
    </Field>
  );
};

export default TextAreaField;
