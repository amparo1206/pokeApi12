import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import {Popup} from 'devextreme-react/popup';
import {Button} from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css'




interface DetailViewProps {
  data: any;
}

interface DetailDataInterface {
  name: string;
  order: number;
  id: number;
  types: [
    {
      slot: number,
      type: {
        name: string,
        url: string
      }
    }
  ]
}


const DetailView = ({data}: DetailViewProps) => {
  const [detailData, setDetailData] = useState<DetailDataInterface | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const showPopup = () => {
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  const popupContent = () => {
    return (
      <div>
        <h2>Contenido del Pop-up</h2>
        <p>Esto es el contenido del popup</p>
        <Button text="Close" onClick={hidePopup} />
      </div>
    );
  };

  const gridContent = () => {
    return(
      <>
      <Typography variant="h5" component="h2">
            Id: {detailData?.id}
          </Typography>
          <Typography color="textSecondary">
            {detailData?.name}
          </Typography>
          {detailData?.types ? 
          <>
          <Typography variant="h5" component="h2">
          Types
        </Typography>
          <DataGrid
            dataSource={detailData?.types}
            columnAutoWidth = {true}
            showBorders={true}>
            <Column
              dataField="slot"
              caption="Id"
              name="id"
              dataType="string"
              alignment="right"
            />
            <Column
              dataField="type.name"
              caption="Tipo"
              name="name"
              dataType="string"
              alignment="right"
            />

          </DataGrid>
          </>
          : <></>
        }
      </>
      
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(data.url);
      setDetailData(result.data);
    };
    fetchData();
  }, [data.url]);

    return (

      <div>
    <Button text = "Pop-up" onClick={showPopup}/>
    {gridContent()}
    <Popup
    visible= {popupVisible}
    onHiding = {hidePopup}
    dragEnabled = {true}
    closeOnOutsideClick = {true}
    contentRender = {popupContent}
    />  
      </div>
    );
};
export default DetailView;
