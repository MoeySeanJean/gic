import { Button, Form, Input, Modal, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createCafe, updateCafe, getCafes } from "../api/cafes";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getLogo } from "../api/logos";
import { useUnsavedChanges } from "../components/UnsavedChanges";


export default function CafeEdit() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { isDirty, setDirty, showModal, setShowModal, pendingPath, setPendingPath } = useUnsavedChanges();

  useEffect(() => {
    if (id) {
      getCafes().then(res => {
        const cafe = res.data.find((c: any) => c.id === id);
        if (cafe) {
          form.setFieldsValue(cafe);
          if (cafe.logo) {
            setFileList([
              {
                uid: "-1",
                name: "logo.png",
                status: "done",
                url: getLogo(cafe.logo),
              },
            ]);
          }
        }
      });
    }
  }, []);

  const handleValuesChange = useCallback(() => {
    setDirty(true);
  }, []);

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    Object.keys(values).forEach(k => formData.append(k, values[k]));
    if (logoFile) formData.append("logo", logoFile);

    setLoading(true);
    try {
      if (id) await updateCafe(id, formData);
      else await createCafe(formData);
      message.success("Saved!");
      setDirty(false);
      navigate("/cafes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-lg mb-4">{id ? "Edit Cafe" : "Add Cafe"}</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit} onValuesChange={handleValuesChange}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input minLength={6} maxLength={10} />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input.TextArea maxLength={256} rows={3} />
        </Form.Item>
        <Form.Item label="Location" name="location" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Logo" name="logo">
          <Upload
            beforeUpload={(f) => {
              if (f.size > 2 * 1024 * 1024) {
                message.error("File must be under 2MB");
                return Upload.LIST_IGNORE;
              }
              setLogoFile(f);
              setFileList([{
                uid: f.uid,
                name: f.name,
                status: "done",
                url: URL.createObjectURL(f),
              }]);
              setDirty(true);
              return false;
            }}
            listType="picture-card"
            maxCount={1}
            fileList={fileList}
            onRemove={() => {
              setLogoFile(null);
              setFileList([]);
            }}
          >
            {fileList.length === 0 && (
              <button
                style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
        <Button 
          type="default" 
          onClick={() => {
            if (isDirty) {
              setPendingPath("/cafes");
              setShowModal(true);
            } else {
              navigate("/cafes");
            }
          }}
          style={{ marginLeft: 8 }}
        >
          Cancel
        </Button>
      </Form>
      <Modal
        open={showModal}
        title="Unsaved Changes"
        okText="Leave"
        cancelText="Stay"
        onOk={() => {
          setShowModal(false);
          setDirty(false);
          if (pendingPath) navigate(pendingPath);
        }}
        onCancel={() => setShowModal(false)}
      >
        <p>You have unsaved changes. Are you sure you want to leave this page?</p>
      </Modal>
    </div>
  );
}
