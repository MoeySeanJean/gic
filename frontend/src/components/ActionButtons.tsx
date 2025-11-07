import React from "react";
import { Space } from "antd";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

interface ActionButtonsProps {
  routePrefix: string;
  id: string | number;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ routePrefix, id, onDelete }) => {
  return (
    <Space>
      <EditButton routePrefix={routePrefix} id={id} />
      <DeleteButton onDelete={onDelete} />
    </Space>
  );
};

export default ActionButtons;
