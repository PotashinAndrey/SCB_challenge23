import React from "react";
import { DatePicker } from "antd";

import { Controller } from "effector-react-form";

const { RangePicker } = DatePicker;

type InputProps = {
    controller: Controller;
    label: React.ReactNode;
  };

export const DatePickerField: React.FC<InputProps> = ({ controller, label }) => {
    const { input } = controller();
  
    return (
      <div className="input-wrap input-wrap_select">
        <label>{label}</label>
        {/* <Select {...input} value={input.value || ''} className="input" /> */}
        <RangePicker {...input} />
      </div>
    );
  };