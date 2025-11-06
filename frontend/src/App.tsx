import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/Layout";
import CafesList from "./pages/CafesList";
import CafeEdit from "./pages/CafeEdit";
import EmployeesList from "./pages/EmployeesList";
import EmployeeEdit from "./pages/EmployeeEdit";
import { UnsavedChangesProvider } from "./components/UnsavedChanges";

export default function App() {
  return (
    <BrowserRouter>
      <UnsavedChangesProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/cafes" />} />
            <Route path="/cafes" element={<CafesList />} />
            <Route path="/cafes/add" element={<CafeEdit />} />
            <Route path="/cafes/:id" element={<CafeEdit />} />
            <Route path="/employees" element={<EmployeesList />} />
            <Route path="/employees/add" element={<EmployeeEdit />} />
            <Route path="/employees/:id" element={<EmployeeEdit />} />
          </Routes>
        </AppLayout>
      </UnsavedChangesProvider>
    </BrowserRouter>
  );
}
