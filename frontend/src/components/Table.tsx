import React from "react";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz, AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

interface TableProps {
  rowData: any[];
  columnDefs: any[];
  onCellClicked?: (event: any) => void;
}

const Table: React.FC<TableProps> = ({
  rowData,
  columnDefs,
  onCellClicked,
}) => {
  return (
    <div className="grid-wrapper" style={{ marginTop: "24px" }}>
      <div style={{ width: "100%", height: 500 }}>
        <AgGridReact
          theme={themeQuartz}
          rowData={rowData}
          columnDefs={columnDefs}
          onCellClicked={onCellClicked}
        />
      </div>
    </div>
  );
};

export default Table;
