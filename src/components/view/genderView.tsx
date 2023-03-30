import React, {useState} from "react";
import DataGrid, { Column } from 'devextreme-react/data-grid';
import DetailView from './detailView';
import { Button } from '@material-ui/core';

interface ViewProps {
    title:string,
}