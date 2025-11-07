import React from "react";
import { Button } from "antd";

interface AddButtonProps {
  text: string;
  style?: React.CSSProperties;
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ text, onClick, style }) => {
  return (
    <Button type="primary" onClick={onClick} style={style}>
      {text}
    </Button>
  );
};

export default AddButton;
