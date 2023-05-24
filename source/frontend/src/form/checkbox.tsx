import React from "react";
import { Checkbox  } from "antd";

import { Controller } from "effector-react-form";

type InputProps = {
    controller: Controller;
    label: React.ReactNode;
  };

export const CheckboxField: React.FC<InputProps> = ({ controller, label }) => {
    const { input } = controller();
  
    return (
      <div className="input-wrap input-wrap_select">
        <label>{label}</label>
        <Checkbox {...input} value={input.value || ''} className="input" />
      </div>
    );
  };