import { FC, useEffect } from 'react';
import { useState } from 'react';
import { Select } from 'antd';

import { Controller } from 'effector-react-form';

type InputProps = {
  controller: Controller;
  label: React.ReactNode;
  data: { label: string; value: string };
};

export const InputTagField: FC<InputProps> = ({ controller, label, data }) => {
  const { input } = controller();
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    input.onChange(tags);
  }, [tags]);

  return (
    <div className="input-wrap">
      <label>
        <span style={{ marginRight: '10px' }}>{label}</span>
        <Select mode="multiple" placeholder="Выберите" defaultValue={[]} options={data} onChange={(value) => setTags(value)} />
      </label>
    </div>
  );
};
