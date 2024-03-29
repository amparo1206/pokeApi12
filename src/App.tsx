import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Sidenav from "./components/sidenav";
import PokeView from "./components/view/pokeView";
import AbilityView from "./components/view/abilityView";
import Home from "./components/pages/home";
import "./App.css";
import Button from "devextreme-react/button";
import "devextreme/dist/css/dx.light.css";
import TabView from "./components/view/tabView";

const App: React.FC = () => {
  const baseUrl = "https://pokeapi.co/api/v2";
  const [selectedPage, setSelectedPage] = useState("home");
  const [open, setOpen] = useState(false);
  const [pokemonData, setPokemonData] = useState<PokeApiResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const [abilityData, setHabilityData] = useState<PokeApiResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [speciesData, setGenderData] = useState<PokeApiResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  interface PokeApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
  }

  useEffect(() => {
    const fetchData = async () => {
      await pokemonApiCall();
      await abilityApiCall();
      await speciesApiCall();
    };
    fetchData();
  }, []);

  const pokemonApiCall = async (url?: string | null) => {
    const defaultUrl = `${baseUrl}/pokemon/`;
    let response = await axios<PokeApiResponse>(url ? url : defaultUrl);
    const results = response.data.results.map((value: any) => {
      return { ...value, id: value.url.split("/").filter(Boolean).pop() };
    });
    let data = response.data;

    data = { ...data, results };
    setPokemonData(data);
  };

  const abilityApiCall = async (url?: string | null) => {
    const defaultUrl = `${baseUrl}/ability/`;
    let response = await axios<PokeApiResponse>(url ? url : defaultUrl);
    const results = response.data.results.map((value: any, index: number) => {
      return { ...value, id: index + 1 };
    });
    let data = response.data;

    data = { ...data, results };
    setHabilityData(data);
  };

  const speciesApiCall = async (url?: string | null) => {
    const defaultUrl = `${baseUrl}/pokemon-species/`;
    let response = await axios<PokeApiResponse>(url ? url : defaultUrl);
    const results = response.data.results.map((value: any, index: number) => {
      return { ...value, id: index + 1 };
    });
    let data = response.data;

    data = { ...data, results };
    setGenderData(data);
  };

  const updatePokemonData = (goTo: string) => {
    switch (goTo) {
      case "previous":
        pokemonApiCall(pokemonData?.previous);
        break;
      case "next":
        pokemonApiCall(pokemonData?.next);
        break;
    }
  };

  const updateAbilityData = (goTo: string) => {
    switch (goTo) {
      case "previous":
        abilityApiCall(abilityData?.previous);
        break;
      case "next":
        abilityApiCall(abilityData?.next);
        break;
    }
  };

  const updateSpeciesData = (goTo: string) => {
    switch (goTo) {
      case "previous":
        speciesApiCall(speciesData?.previous);
        break;
      case "next":
        speciesApiCall(speciesData?.next);
        break;
    }
  };

  const handlepageChange = (page: string) => {
    setSelectedPage(page);
  };

  const onMenuItemSelect = (page: string) => {
    switch (page) {
      case "home":
        return <Home title="Home" />;
      case "pokemon":
        return <TabView tabs={tabs} />;
      default:
        return <Home title="Home" />;
    }
  };

  const tabs = [
    {
      title: "Pokemon",
      component: (
        <PokeView
          title="Pokémon"
          data={pokemonData?.results}
          updateDataGrid={updatePokemonData}
        />
      ),
    },
    {
      title: "Habilidad",
      component: (
        <AbilityView
          title="Habilidad"
          data={abilityData?.results}
          updateDataGrid={updateAbilityData}
        />
      ),
    }
  ];

  return (
    <div className="page-wrapper">
      <div className="sidebar-container">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Menu
        </Button>
        <Sidenav
          open={open}
          onClose={() => setOpen(false)}
          onMenuItemSelect={handlepageChange}
        />
      </div>
      <div className="page-content">{onMenuItemSelect(selectedPage)}</div>
    </div>
  );
};

export default App;
