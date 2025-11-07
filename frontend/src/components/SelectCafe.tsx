import React from "react";
import { Select } from "antd";

interface Cafe {
  id: string | number;
  name: string;
}

interface CafeSelectProps {
  cafes: Cafe[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  allowClear?: boolean;
}

const CafeSelect: React.FC<CafeSelectProps> = ({
  cafes,
  value,
  onChange,
}) => {
  return (
    <Select
      placeholder="Select a café"
      allowClear
      value={value}
      onChange={onChange}
    >
      {cafes.map((cafe) => (
        <Select.Option key={cafe.id} value={cafe.id}>
          {cafe.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CafeSelect;
