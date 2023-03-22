import React from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import DetailView from './detailView';

interface ViewProps {
  title: string;
  data: any[];
  selectedData: any;
  onItemClick: (item: any) => any;
}

const PokeView: React.FC<ViewProps> = ({ title, data, onItemClick, selectedData }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className='poke-container'>
        <div className="poke-table">
          <DataGrid
            dataSource={data}
            onRowClick={onItemClick}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
        showBorders={true}>
        <Column
              dataField="id"
              caption="Id"
              dataType="number"
              alignment="right"
            />
            <Column
              dataField="name"
              caption="Nombre"
              dataType="string"
              alignment="right"
            />
          </DataGrid>      
        </div>
        <div className="poke-detail">
          {selectedData && <DetailView data={selectedData} />}
        </div>
      </div>
      
    </div>
  );
};

export default PokeView;