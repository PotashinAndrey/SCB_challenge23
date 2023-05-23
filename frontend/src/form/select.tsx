import React from "react";
import { Select } from "antd";

import { Controller } from "effector-react-form";

type InputProps = {
    controller: Controller;
    label: React.ReactNode;
    options: Array<any>;
  };

export const SelectField: React.FC<InputProps> = ({ controller, label, options }) => {
    const { input } = controller();
  
    return (
      <div className="input-wrap input-wrap_select">
        <label>{label}</label>
        <Select {...input} value={input.value || ''} options={options || []} className="input" />
      </div>
    );
  };