import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import React, { useEffect, useState } from "react";
import Favourites from "./Favourites";
import Pokemons from "./Pokemons";
import 'react-tabs/style/react-tabs.css';
import "../App.css";
import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";

const Main = () => {
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
      {/* pass data to pokemonInfo */}

      <Tabs className="tabStyle">
        <TabList className='tabs'>
          <Tab>Pokemons</Tab>
          <Tab>Favourites</Tab>
        </TabList>
        <TabPanel>
          <Pokemons pokemon={pokeData} loading={loading}  />
        </TabPanel>
        <TabPanel>
          <Favourites />
        </TabPanel>
      </Tabs>
    </>
  )
}
export default Main;