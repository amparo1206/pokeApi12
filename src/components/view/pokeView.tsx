import React, { useState } from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import DetailView from './detailView';
import { Button } from '@material-ui/core';

interface ViewProps {
  title: string;
  data: any[];
  updateDataGrid: (page: string) => void;
}

const PokeView = ({title, data, updateDataGrid}: ViewProps) => {
  const [selectedData, setSelectedData] = useState(null);
  
  return (
    <div>
      <h2>{title}</h2>
      <div className='poke-container'>
        <div className="poke-table">
          <DataGrid
            dataSource={data}
            onRowClick={(item) => {setSelectedData(item.data)}}
        showBorders={true}>
            <Column
              dataField="name"
              caption="Nombre"
              dataType="string"
              alignment="right"
            />
          </DataGrid>     
          <Button onClick={() => updateDataGrid('previous')}>Previous</Button> 
          <Button onClick={() => updateDataGrid('next')}>Next</Button> 
        </div>
        <div className="poke-detail">
          {selectedData && <DetailView data={selectedData} />}
        </div>
      </div>
      
    </div>
  );
};

export default PokeView;