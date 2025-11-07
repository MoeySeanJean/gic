import React from "react";
import { Button } from "antd";

interface SubmitButtonProps {
  loading?: boolean;
  style?: React.CSSProperties;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading = false,
  style,
}) => {
  return (
    <Button type="primary" htmlType="submit" loading={loading} style={style}>
      Submit
    </Button>
  );
};

export default SubmitButton;
