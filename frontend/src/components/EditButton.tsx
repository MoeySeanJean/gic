import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface EditButtonProps {
  routePrefix: string;
  id: string | number;
}

const EditButton: React.FC<EditButtonProps> = ({ routePrefix, id }) => {
  const navigate = useNavigate();

  return (
    <Button size="small" onClick={() => navigate(`/${routePrefix}/${id}`)}>
      Edit
    </Button>
  );
};

export default EditButton;
