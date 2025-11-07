import React from "react";
import { Modal } from "antd";

interface ConfirmDeleteModalProps {
  open: boolean;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  itemName,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      open={open}
      title="Confirm Delete"
      okText="Delete"
      okType="danger"
      cancelText="Cancel"
      onOk={onConfirm}
      onCancel={onCancel}
    >
      <p>Are you sure you want to delete {itemName}?</p>
    </Modal>
  );
};

export default ConfirmDeleteModal;
