import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidenav from './components/sidenav';
import PokeView from './components/pokeView';
import Home from './components/home';
import './App.css';
import { Button } from '@material-ui/core';

const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  interface AxiosResponse{
  
}

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios<>('https://pokeapi.co/api/v2/pokemon/');
      const results = response.results.map((value: any, index: number) => {
        return { ...value, id: index + 1 }
      })
      response = {
        ...response, 
      setData(response);
    };
    fetchData();
  }, []);

  const handleListItemClick = (item: any) => {
    setSelectedData(item.data);
  };

  const handlepageChange = (page: string) => {
    setSelectedPage(page);
  };

  const onMenuItemSelect = (page: string) => {
    switch (page) {
      case "home":
        return <Home title="Home" />
      case "pokemon":
        return <PokeView title="Pokémon" data={data} selectedData={selectedData} onItemClick={handleListItemClick} />
      default:
        return <Home title="Home" />
    }
  };


  return (
    <div className='page-wrapper'>
      <div className="sidebar-container">
          <Button onClick={() => {setOpen(true)}}>
          Menu
        </Button>
        <Sidenav open={open} onClose={() => setOpen(false)} onMenuItemSelect={handlepageChange}/>
      </div>
      <div className="page-content">
        {onMenuItemSelect(selectedPage)}
      </div>
    </div>
  );
};

export default App;
