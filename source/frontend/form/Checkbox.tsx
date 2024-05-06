import type { FC } from 'react';
import { Checkbox } from 'antd';
import Field, { useFieldProps, type FieldProps } from './Field';

type CheckboxProps = FieldProps<boolean> & { placeholder?: string };

const CheckboxField: FC<CheckboxProps> = props => {
  const { label, field, placeholder = label } = props;
  const { value, onChange } = useFieldProps(field);

  return (
    <Field label={label} field={field}>
      <div>
        <Checkbox
          value={value}
          onChange={e => onChange(e.target.checked)}
        />
        <label>{placeholder}</label>
      </div>
    </Field>
  );
};

export default CheckboxField;
