import React from "react";
import { Modal } from "antd";

interface ConfirmLeaveModalProps {
  open: boolean;
  onLeave: () => void;
  onStay: () => void;
}

const ConfirmLeaveModal: React.FC<ConfirmLeaveModalProps> = ({
  open,
  onLeave,
  onStay,
}) => {
  return (
    <Modal
      open={open}
      title="Unsaved Changes"
      okText="Leave"
      cancelText="Stay"
      onOk={onLeave}
      onCancel={onStay}
    >
      <p>You have unsaved changes. Are you sure you want to leave this page?</p>
    </Modal>
  );
};

export default ConfirmLeaveModal;