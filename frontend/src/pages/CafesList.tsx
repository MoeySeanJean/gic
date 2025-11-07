import { useCallback, useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { getCafes, deleteCafe } from '../api/cafes';
import type { ColDef, CellClickedEvent } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import LogoCell from '../components/LogoCell';
import ActionButtons from '../components/ActionButtons';
import AddButton from '../components/AddButton';
import Table from '../components/Table';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';


interface Cafe {
  id: string;
  logo?: string;
  name: string;
  description: string;
  employees: number;
  location: string;
}

const CafesList = () => {
  const navigate = useNavigate();

  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [colDefs] = useState<ColDef<Cafe>[]>([
    { field: "logo", flex: 1, cellRenderer: (p: any) => {
        if (p.value) {
          return <LogoCell logoUrl={p.value} />;
        }
      }
    },
    { field: "name", flex: 1 },
    { field: "description", flex: 1 },
    { field: "employees", flex: 1 },
    { field: "location", flex: 1 },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (p: any) => (
        <ActionButtons
          routePrefix='cafes'
          id={p.value}
          onDelete={() => handleDeleteClick(p.data)}
        />
      ),
    },
  ]);

  const fetchData = async (location?: string) => {
    try {
      const res = await getCafes(location || undefined);
      setCafes(res.data);
    } catch (err) {
      console.error('Failed to fetch cafes', err);
      setCafes([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPanelValue = (searchText: string) => {
    if (!searchText) return [];
    const matches = cafes
      .filter((c) => c.location.toLowerCase().includes(searchText.toLowerCase()))
      .map((c) => ({ value: c.location }));
    const seen = new Set<string>();
    return matches.filter((o) => {
      if (seen.has(o.value)) return false;
      seen.add(o.value);
      return true;
    });
  };

  const onSelect = (data: string) => {
    fetchData(data);
  };

  const onChange = (value: string) => {
    if (!value) {
      fetchData();
      setOptions([]);
    }
  };

  const handleAddCafe = () => {
    navigate("/cafes/add");
  };

  const handleDeleteClick = async (cafe: Cafe) => {
    setSelectedCafe(cafe);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCafe) return;
    try {
      await deleteCafe(selectedCafe.id);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
      setSelectedCafe(null);
    }
  };

  const onCellClicked = useCallback((event: CellClickedEvent<Cafe>) => {
    if (event.colDef?.field === "employees") {
      const cafeName = event.data?.name;
      navigate("/employees", { state: { filter: cafeName } });
    }
  }, [navigate]);

  return (
    <>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={onChange}
        onSearch={(text) => setOptions(getPanelValue(text))}
        placeholder="Filter by location"
        allowClear
      />
      <AddButton text="Add New Café" onClick={handleAddCafe} style={{ float: "right" }} />
      <div style={{ clear: 'both' }}></div>
      <Table
        rowData={cafes}
        columnDefs={colDefs}
        onCellClicked={onCellClicked}
      />
      <ConfirmDeleteModal
        open={showModal}
        itemName={selectedCafe?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default CafesList;
