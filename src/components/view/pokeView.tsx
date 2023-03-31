import React, { useState } from "react";
import DataGrid, { Column, Selection } from "devextreme-react/data-grid";
import 'devextreme/dist/css/dx.light.css'
import Button from 'devextreme-react/button';
import DetailView from "./detailView";

interface ViewProps {
  title: string;
  data: any[];
  updateDataGrid: (page: string) => void;
}

const PokeView = ({ title, data, updateDataGrid }: ViewProps) => {
  const [selectedData, setSelectedData] = useState(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  return (
    <div>
      <h2>{title}</h2>
      <div className="poke-container">
        <div className="poke-table">
          <DataGrid
          selectedRowKeys={selectedRowKeys}
            dataSource={data}
            onSelectionChanged = {(e) => {
              setSelectedRowKeys(e.selectedRowKeys)}
            }
            onRowClick={(item) => {
              setSelectedData(item.data);
            }}
            showBorders={true}
          >
            <Selection
            mode="single"
          />
            <Column
              dataField="id"
              caption="Id"
              name="id"
              dataType="string"
              alignment="right"
            />
            <Column
              dataField="name"
              caption="Nombre"
              name="name"
              dataType="string"
              alignment="right"
            />
          </DataGrid>

          <Button className="button-dev" onClick={() => updateDataGrid("previous")}>Previous</Button>
          <Button className="button-dev" onClick={() => updateDataGrid("next")}>Next</Button>
        </div>
        <div className="poke-detail">
          {selectedData && <DetailView data={selectedData} />}
        </div>
      </div>
    </div>
  );
};

export default PokeView;
