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
        {gridContent()}
      </div>
    );
  };

  const gridContent = () => {
    return(
      <>
      <Typography className='content-popup-inside' variant="h2" component="h3">
            Id: {detailData?.id}
          </Typography>
          <Typography className='content-popup-pokemon-name'>
            {detailData?.name}
          </Typography>
          {detailData?.types ? 
          <>
          <Typography className='content-popup-inside'  variant="h2" component="h5">
          Types
        </Typography>
          <DataGrid className='pop-up-DaraGrid'
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
