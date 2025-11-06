import { useCallback, useEffect, useState } from 'react';
import { AutoComplete, Button, Modal, Space } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { getCafes, deleteCafe } from '../api/cafes';
import type { ColDef, CellClickedEvent } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { LogoCell } from '../components/LogoCell';
ModuleRegistry.registerModules([AllCommunityModule]);


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
  const [colDefs, setColDefs] = useState<ColDef<Cafe>[]>([
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
        <Space>
          <Button size="small" onClick={() => navigate(`/cafes/${p.value}`)}>
            Edit
          </Button>
          <Button size="small" danger onClick={() => handleDeleteClick(p.data)}>
            Delete
          </Button>
        </Space>
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
    if (event.colDef && (event.colDef.field as string) === 'employees') {
      navigate(`/employees`);
    }
  }, []);

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
      <Button type="primary" onClick={handleAddCafe} style={{ float: 'right' }}>
        Add New Café
      </Button>
      <div className="grid-wrapper" style={{ marginTop: "24px" }}>
        <div style={{ width: '100%', height: 500 }} >
          <AgGridReact
            theme={themeQuartz}
            rowData={cafes}
            columnDefs={colDefs}
            onCellClicked={onCellClicked}
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
        <p>Are you sure you want to delete {selectedCafe?.name}?</p>
      </Modal>
    </>
  );
};

export default CafesList;
