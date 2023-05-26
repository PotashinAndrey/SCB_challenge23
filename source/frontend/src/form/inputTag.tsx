import { FC, useEffect } from "react";
import { useState, useRef } from "react";
import { Input, Tag } from "antd";
import type { InputRef } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { Controller } from "effector-react-form";

type InputProps = {
  controller: Controller;
  label: React.ReactNode;
};

export const InputTagField: FC<InputProps> = ({ controller, label }) => {
  const { input } = controller();

  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  useEffect(() => {
    input.onChange(tags)
  }, [tags]);


  return (
    <div className="input-wrap">
      <label>
        <span style={{marginRight: "10px"}}>{label}</span>
        {tags.map((tag) => (
          <Tag>
            {tag}
          </Tag>
        ))}
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            value={inputValue}
            style={{maxWidth: "200px"}}
            // value={input.value || ''}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag onClick={showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
        {/* <Input {...input} value={input.value || ''} className="input" /> */}
      </label>
    </div>
  );
};

