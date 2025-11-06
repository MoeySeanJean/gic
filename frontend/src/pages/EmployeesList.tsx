import { useEffect, useState } from 'react';
import { Button, Modal, Space } from 'antd';
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from '../api/employees';
ModuleRegistry.registerModules([AllCommunityModule]);

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: number;
  daysWorked: number;
  cafe?: string;
}

const EmployeesList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [colDefs, setColDefs] = useState<ColDef<Employee>[]>([
    { field: "id", flex: 1 },
    { field: "name", flex: 1 },
    { field: "email", flex: 1 },
    { field: "phone", flex: 1 },
    { field: "daysWorked", flex: 1 },
    { field: "cafe", flex: 1 },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (p: any) => (
        <Space>
          <Button size="small" onClick={() => navigate(`/employees/${p.value}`)}>
            Edit
          </Button>
          <Button size="small" danger onClick={() => handleDeleteClick(p.data)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]);

  const fetchData = async (cafe?: string) => {
    try {
      const res = await getEmployees(cafe || undefined);
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to fetch employees', err);
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEmployee = () => {
    navigate("/employees/add");
  };

  const handleDeleteClick = async (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return;
    try {
      await deleteEmployee(selectedEmployee.id);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
      setSelectedEmployee(null);
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleAddEmployee} style={{ float: 'right' }}>
        Add New Employee
      </Button>
      <div style={{ clear: 'both' }}></div>
      <div className="grid-wrapper" style={{ marginTop: "24px" }}>
        <div style={{ width: '100%', height: 500 }} >
          <AgGridReact
            theme={themeQuartz}
            rowData={employees}
            columnDefs={colDefs}
          />
        </div>
      </div>
      <Modal
        open={showModal}
        title="Confirm Delete"
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
        onOk={handleConfirmDelete}
        onCancel={() => setShowModal(false)}
      >
        <p>Are you sure you want to delete {selectedEmployee?.name}?</p>
      </Modal>
    </>
  );
};

export default EmployeesList;
