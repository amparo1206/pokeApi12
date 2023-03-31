import React, { useState } from 'react';
import DataGrid, { Column, Selection } from 'devextreme-react/data-grid';
import DetailView from './detailView';
import 'devextreme/dist/css/dx.light.css'
import Button from 'devextreme-react/button';

interface ViewProps {
  title: string;
  data: any[];
  updateDataGrid: (goTo: string) => any;
}

const AbilityView = ({title, data, updateDataGrid}: ViewProps )=> {
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
          <Selection
            mode="single"
          />
            <Column
              dataField="name"
              caption="Nombre"
              dataType="string"
              alignment="right"
            />
          </DataGrid>     
          <Button className="button-dev" onClick={() => updateDataGrid('previous')}>Previous</Button> 
          <Button className="button-dev" onClick={() => updateDataGrid('next')}>Next</Button> 
        </div>
        <div className="poke-detail">
          {selectedData && <DetailView data={selectedData} />}
        </div>
      </div>
      
    </div>
  );
};

export default AbilityView;