import type { FC } from 'react';
import { Radio } from 'antd';

import { Controller } from 'effector-react-form';

type InputProps = {
  controller: Controller;
  label: React.ReactNode;
  options: {
    name: string;
    value: string;
  }[];
};

export const RadioField: FC<InputProps> = ({ controller, label, options }) => {
  const { input } = controller();

  return (
    <div className="input-wrap input-wrap_select">
      <label style={{ marginRight: '10px' }}>{label}</label>
      <Radio.Group {...input} value={input.value || ''} className="input">
        {options.map((e) => (
          <Radio key={e.value} value={e.value}>
            {e.name}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};
