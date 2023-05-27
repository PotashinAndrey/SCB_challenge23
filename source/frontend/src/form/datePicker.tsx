import type { FC } from "react";
import { DatePicker } from "antd";

import { Controller } from "effector-react-form";

type InputProps = {
    controller: Controller;
    label: React.ReactNode;
    placeholder?: string;
  };

export const DatePickerField: FC<InputProps> = ({ controller, label, placeholder }) => {
    const { input } = controller();

    return (
      <div className="input-wrap input-wrap_select">
        <label style={{marginRight: "10px"}}>{label}</label>
        {/* <Select {...input} value={input.value || ''} className="input" /> */}
        <DatePicker {...input} placeholder={placeholder}  />
      </div>
    );
  };
