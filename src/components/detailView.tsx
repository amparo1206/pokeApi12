import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';

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

const DetailView: React.FC<DetailViewProps> = ({ data }) => {
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
            Order: {detailData?.order}
          </Typography>
          <Typography color="textSecondary">
            {detailData?.name}
          </Typography>
          <Typography variant="h5" component="h2">
            Types
          </Typography>
          {detailData?.types.map((typeObject) => { 
            return <Typography key={typeObject.slot} color="textSecondary">
              {typeObject.slot}: {typeObject.type.name}
            </Typography>
          }) }

        </CardContent>
      </Card>
    );
};
export default DetailView;
