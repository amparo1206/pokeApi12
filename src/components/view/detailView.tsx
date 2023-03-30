import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react';


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
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(data.url);
      setDetailData(result.data);
    };
    fetchData();
  }, [data.url]);

    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Id: {detailData?.id}
          </Typography>
          <Typography color="textSecondary">
            {detailData?.name}
          </Typography>
          <Typography variant="h5" component="h2">
            Types
          </Typography>
          {detailData?.types ? 
          <DataGrid
            dataSource={detailData?.types}
            columnAutoWidth = {true}
            showBorders={true}>
            <Column
              dataField="slot"
              caption="Id"
              dataType="string"
              alignment="right"
            />
            <Column
              dataField="type.name"
              caption="Tipo"
              dataType="string"
              alignment="right"
            />
          </DataGrid>
          : <></>
        }
          

        </CardContent>
      </Card>
    );
};
export default DetailView;
