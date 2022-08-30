import React, { useEffect, useState } from "react";
import Favourites from "./Favourites";
import Pokemons from "./Pokemons";
import 'react-tabs/style/react-tabs.css';
import "../App.css";
import axios from "axios";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import image from '../images/Vector.png'

const Main = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://pokeapi.co/api/v2/pokemon/"
  
  for (let i = 0; i < pokeData.length; i++) {
    pokeData[i].id = i + 1;
  }
  const pokemonList = async () => {
    setLoading(true);
    const res = await axios.get(url);
    getPokemon(res.data.results);
    setLoading(false)
    console.log(res.data.results);
  }
  const getPokemon = async (data) => {
    const pokemons = await Promise.all(data.map(async (pokemon) => {
      const res = await axios.get(pokemon.url);
      //return data and pokeDex
      return res.data;
    }
    ))
    setPokeData(pokemons)
    console.log(pokemons);
  }
  // call the function to get more pokemon data

  useEffect(() => {
    pokemonList();
    // fetchMoreData();
  }, [url])
   
  
  return (
    <>
    <div className="header">
    <img src={image} alt="logo" />
    <h2>Pokedex</h2>
    </div>
    <Box sx={{ width: '100%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} 
          variant="fullWidth"
          sx= {{
            bgcolor: 'background.paper',
            "& button": {
              textTransform: 'capitalize',
              fontSize: '20px',
              fontWeight: '500',
              lineHeight: '24px'
            },
          }}
          aria-label="lab API tabs example">
            <Tab label="Pokemons" value="1" />
            <Tab label="Favourites" value="2" />
           
          </TabList>
        </Box>
        <TabPanel value="1">
        <Pokemons pokemon={pokeData} loading={loading}  />
        </TabPanel>
        <TabPanel value="2">
          <Favourites />
        </TabPanel>
      </TabContext>
    </Box>
    </>
  );

}
export default Main;