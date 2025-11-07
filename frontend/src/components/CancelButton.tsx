import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface CancelButtonProps {
  isDirty: boolean;
  setPendingPath: (path: string) => void;
  setShowModal: (show: boolean) => void;
  to: string;
  style?: React.CSSProperties;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  isDirty,
  setPendingPath,
  setShowModal,
  to,
  style,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isDirty) {
      setPendingPath(to);
      setShowModal(true);
    } else {
      navigate(to);
    }
  };

  return (
    <Button type="default" onClick={handleClick} style={style}>
      Cancel
    </Button>
  );
};

export default CancelButton;
