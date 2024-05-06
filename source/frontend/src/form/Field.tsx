import type { PropsWithChildren } from 'react';
import { Typography } from 'antd';
import type { PrimitiveField, PrimitiveValue } from '@effector-reform/core';
import type { ReactPrimitiveFieldApi } from '@effector-reform/react';
import { useField } from '@effector-reform/react';

const { Paragraph, Text } = Typography;

type FieldPropType<FieldType extends PrimitiveValue> = PrimitiveField<FieldType> | ReactPrimitiveFieldApi<FieldType>;

export type FieldProps<FieldType extends PrimitiveValue> = {
  label: string;
  field: FieldPropType<FieldType>;
};

export const useFieldProps = <FieldType extends PrimitiveValue>(field: FieldPropType<FieldType>) => {
  return '@@unitShape' in field
    ? useField(field) // field: PrimitiveField<FieldType>
    : field;          // field: ReactPrimitiveFieldApi<FieldType>
}

const Field = <T extends PrimitiveValue, >(props: PropsWithChildren<FieldProps<T>>) => {
  const { label, children, field } = props;
  const { error } = useFieldProps(field);

  return (
    <Paragraph>
      <Text>{label}</Text>
      {children}
      {error !== null && <Text type="danger">{error}</Text>}
    </Paragraph>
  );
};

export default Field;
