import { Form, Input, message } from "antd";
import { createCafe, updateCafe, getCafes } from "../api/cafes";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getLogo } from "../api/logos";
import { useUnsavedChanges } from "../components/UnsavedChangesContext";
import ConfirmLeaveModal from "../components/ConfirmLeaveModal";
import CancelButton from "../components/CancelButton";
import SubmitButton from "../components/SubmitButton";
import ImageUpload from "../components/UploadButton";


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
          <ImageUpload
            fileList={fileList}
            setFileList={setFileList}
            setSelectedFile={setLogoFile}
            setDirty={setDirty}
            maxSizeMB={2}
          />
        </Form.Item>
        <SubmitButton loading={loading} />
        <CancelButton
          isDirty={isDirty}
          setPendingPath={setPendingPath}
          setShowModal={setShowModal}
          to="/cafes"
          style={{ marginLeft: 8 }}
        />
      </Form>
      <ConfirmLeaveModal
        open={showModal}
        onLeave={() => {
          setShowModal(false);
          setDirty(false);
          if (pendingPath) navigate(pendingPath);
        }}
        onStay={() => setShowModal(false)}
      />
    </div>
  );
}
