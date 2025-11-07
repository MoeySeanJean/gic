import { useEffect, useState } from 'react';
import type { ColDef } from "ag-grid-community";
import { useLocation, useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from '../api/employees';
import ActionButtons from '../components/ActionButtons';
import AddButton from '../components/AddButton';
import Table from '../components/Table';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

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
  const location = useLocation();

  const filter = location.state?.filter

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [colDefs] = useState<ColDef<Employee>[]>([
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
        <ActionButtons
          routePrefix='employees'
          id={p.value}
          onDelete={() => handleDeleteClick(p.data)}
        />
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
    if (filter) {
      fetchData(filter);
    } else {
      fetchData();
    }
  }, [filter]);

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
      <AddButton text="Add New Employee" onClick={handleAddEmployee} style={{ float: "right" }} />
      <div style={{ clear: 'both' }}></div>
      <Table
        rowData={employees}
        columnDefs={colDefs}
      />
      <ConfirmDeleteModal
        open={showModal}
        itemName={selectedEmployee?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default EmployeesList;
