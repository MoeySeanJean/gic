import React from "react";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface ImageUploadProps {
  fileList: any[];
  setFileList: (files: any[]) => void;
  setSelectedFile: (file: File | null) => void;
  setDirty: (dirty: boolean) => void;
  maxSizeMB?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  fileList,
  setFileList,
  setSelectedFile,
  setDirty,
  maxSizeMB = 2,
}) => {
  const beforeUpload = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      message.error(`File must be under ${maxSizeMB}MB`);
      return Upload.LIST_IGNORE;
    }

    setSelectedFile(file);

    const customFile = Object.assign(file, {
        uid: `${Date.now()}`, // generate a unique id
    });

    setFileList([
        {
        uid: customFile.uid,
        name: customFile.name,
        status: "done",
        url: URL.createObjectURL(customFile),
        },
    ]);
    setDirty(true);
    
    return false;
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setFileList([]);
    setDirty(true);
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      listType="picture-card"
      maxCount={1}
      fileList={fileList}
      onRemove={handleRemove}
    >
      {fileList.length === 0 && (
        <button
          style={{ color: "inherit", cursor: "inherit", border: 0, background: "none" }}
          type="button"
        >
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      )}
    </Upload>
  );
};

export default ImageUpload;
