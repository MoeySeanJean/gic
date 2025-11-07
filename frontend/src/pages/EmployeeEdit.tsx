import { Form, Input, message } from "antd";
import { getEmployees, createEmployee, updateEmployee } from "../api/employees";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useUnsavedChanges } from "../components/UnsavedChangesContext";
import { getCafes } from "../api/cafes";
import ConfirmLeaveModal from "../components/ConfirmLeaveModal";
import CancelButton from "../components/CancelButton";
import SubmitButton from "../components/SubmitButton";
import GenderSelect from "../components/SelectGender";
import CafeSelect from "../components/SelectCafe";


export default function EmployeeEdit() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [cafes, setCafes] = useState<any[]>([]);

  const { isDirty, setDirty, showModal, setShowModal, pendingPath, setPendingPath } = useUnsavedChanges();

  useEffect(() => {
    if (id) {
      getEmployees().then(res => {
        const employee = res.data.find((e: any) => e.id === id);
        if (employee) {
          form.setFieldsValue(employee);
          form.setFieldsValue({
            cafeId: employee.cafe
              ? cafes.find(c => c.name === employee.cafe)?.id
              : undefined,
          });
        }
      });
    }
  }, [cafes]);

  useEffect(() => {
    getCafes().then(res => setCafes(res.data));
  }, []);

  const handleValuesChange = useCallback(() => {
    setDirty(true);
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (id) await updateEmployee(id, values);
      else await createEmployee(values);
      message.success("Saved!");
      setDirty(false);
      navigate("/employees");
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
        <Form.Item label="Email address" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Phone number" name="phone" rules={[{ required: true, pattern: /^[89]\d{7}$/ }]}>
          <Input maxLength={8} />
        </Form.Item>
        <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
          <GenderSelect />
        </Form.Item>
        <Form.Item label="Assigned Café" name="cafeId">
          <CafeSelect cafes={cafes} />
        </Form.Item>
        <SubmitButton loading={loading} />
        <CancelButton
          isDirty={isDirty}
          setPendingPath={setPendingPath}
          setShowModal={setShowModal}
          to="/employees"
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
