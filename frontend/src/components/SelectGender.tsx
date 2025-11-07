import React from "react";
import { Radio } from "antd";

interface SelectGenderProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectGender: React.FC<SelectGenderProps> = ({ value, onChange }) => {
  return (
    <Radio.Group
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      <Radio value="Male">Male</Radio>
      <Radio value="Female">Female</Radio>
    </Radio.Group>
  );
};

export default SelectGender;
