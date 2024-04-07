import type { PropsWithChildren } from 'react';
import { Typography } from 'antd';
import type { FieldDescriptor } from '@filledout/react';
import { useField } from '@filledout/react';

const { Paragraph, Text } = Typography;

export type FieldProps<V, T> = {
  label: string;
  field: FieldDescriptor<V, T>;
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const Field = <V, T extends any, >(props: PropsWithChildren<FieldProps<V, T>>) => {
  const { label, children, field } = props;
  const temp = useField(field);
  const { errors } = temp;

  return (
    <Paragraph>
      <Text>{label}</Text>
      {children}
      {errors !== null && <Text type="danger">{errors?.join(", ")}</Text>}
    </Paragraph>
  );
};

export default Field;
