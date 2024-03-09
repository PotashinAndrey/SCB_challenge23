import type { FC } from 'react';
import Tag from 'antd/es/tag';

type AmountProps = {
  value: number;
  mode?: 'from' | 'to';
  currency?: string;
  color?: string;
};

/** Amount -  */
const Amount: FC<AmountProps> = (props) => {
  const { value, mode, currency = 'RUB', color } = props;

  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  const amount = new Intl.NumberFormat('ru-RU', options).format(value);
  const prefix = mode === 'from' ? 'от ' : mode === 'to' ? 'до ' : undefined;

  return (
    <Tag color={color}>
      {prefix}
      {amount}
    </Tag>
  );
};

export default Amount;
